const axios = require('axios')
const nanoid = require('nanoid')
const oauthSignature = require('oauth-signature')

let activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

require('dotenv').config({
    path: `.env.${activeEnv}`,
})

// Set up essential values
const secretData = {
    gfKey: process.env.GRAVITY_FORMS_KEY,
    gfSecret: process.env.GATSBY_FORMS_SECRET + "&",
}

// For those requests
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
}

exports.handler = async (event, context, callback) => {
    // Make sure we are dealing with a POST request
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                status: 'notPost',
                message: 'This was not a POST request!',
            }),
        }
    }

    // Parse that post data body
    const data = JSON.parse(event.body)

    const url = data.data.baseUrl + '/submissions'

    // Check we have the required data
    if (!url) {
        return {
            statusCode: 424,
            headers,
            body: JSON.stringify({
                status: 'missingApiData',
                message: 'Required API data is missing',
            }),
        }
    }

    const timeStamp = getCurrentTimestamp()
    const nanoId = nanoid(11)

    // Now we can do the real work - Gravity Forms API stuff
    const requestParams = {
      oauth_consumer_key : secretData.gfKey, // your consumer_key
      oauth_signature_method : 'HMAC-SHA1',
      oauth_timestamp : timeStamp,
      oauth_nonce : nanoId,
      oauth_version : '1.0'
    }
    
    const encodedSignature = oauthSignature.generate(
      'POST',
      url,
      requestParams,
      secretData.gfSecret
    )

    const authorizationHeader = new0AuthHeader(secretData.gfKey, encodedSignature, nanoId, timeStamp)

    let result
    try {
        result = await axios({
            method: 'post',
            url: url,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': authorizationHeader
            },
            data: data.data.payload,
        })
    } catch (error) {
        // Check the function log for this!
        console.log('newGFEntry.js Error Data')
        console.log(error)

        const errorResponse = error.response.data

        // Here we know this is a Gravity Form Error
        if (errorResponse.is_valid === false) {
            return {
                statusCode: 422,
                headers,
                body: JSON.stringify({
                    status: 'gravityFormErrors',
                    message: 'Gravity Forms has flagged issues',
                    validation_messages: errorResponse.validation_messages,
                }),
            }
        } else {
            // Unknown error
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    status: 'unknown',
                    message: 'Something went wrong',
                }),
            }
        }
    }

    return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
            status: 'success',
            message: 'Entry added to Gravity Forms',
            confirmation_message: result.data.confirmation_message,
        }),
    }
}

function getCurrentTimestamp() {
    return Math.round(new Date().getTime() / 1000)
}

function new0AuthHeader(consumerKey, encodedSignature, nanoId, timeStamp) {
    return (  
          'OAuth oauth_consumer_key="' + consumerKey
          + '",oauth_nonce="' + nanoId
          + '",oauth_signature="' + encodedSignature +'"'
          + '",oauth_signature_method="HMAC-SHA1"'
          + '",oauth_timestamp="' + timeStamp
          + '",oauth_version="1.0"'
    )
}