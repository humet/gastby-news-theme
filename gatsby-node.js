const {google} = require('googleapis')

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const DEPLOY_ENV = process.env.DEPLOY_ENV || 'lbn_published_production';

/**
 * Download Google Analytics Pageview data
 */
const googleConfig = {
  email: process.env.CLIENT_EMAIL,
  key: process.env.GOOGLE_API_KEY.replace(new RegExp("\\\\n", "\g"), "\n"),
  viewId: "201141234",
  startDate: "7daysAgo",
  scopes: 'https://www.googleapis.com/auth/analytics.readonly'
}

async function getPageviews() {
  const jwt = new google.auth.JWT(googleConfig.email, null, googleConfig.key, googleConfig.scopes)
  await jwt.authorize()
  const result = await google.analytics('v3').data.ga.get({
      'auth': jwt,
      'ids': 'ga:' + googleConfig.viewId,
      'start-date': googleConfig.startDate || '2009-01-01',
      'end-date': 'today',
      'dimensions': 'ga:pagePath',
      'metrics': 'ga:pageviews',
      'sort': '-ga:pageviews',
    })

  return result
}

const pageviewData = getPageviews()

/**
 * Generate node edges
 *
 * @param {any} { node, actions, getNode }
 */
exports.onCreateNode = async ({
  node, actions
}) => {
  const { createNodeField } = actions;

  /**
   * If these don't exist, the LBN WordPress Plugin isn't installed – so build all posts.
   */
  if (
    !Object.prototype.hasOwnProperty.call(node, 'meta') ||
    !Object.prototype.hasOwnProperty.call(node.meta, 'lbn_published_production')
    ) {
    createNodeField({ node, name: 'deploy', value: true });
    return;
  }

  let deploy;

  if (node.meta[DEPLOY_ENV]) {
    deploy = true;
  } else {
    deploy = false;
  }

  createNodeField({ node, name: 'deploy', value: deploy });

  /**
   * Add pageviews to post nodes
   */
  const pvData = await pageviewData
  
  if(node.internal.type == "wordpress__POST") {
    const currentPost = pvData.data.rows.filter(data => {
      return node.path == data[0]
    })
    if(typeof currentPost[0] === 'undefined') {
      createNodeField({node, name: 'pageviews7days', value: 0 })
    } else {
      createNodeField({node, name: 'pageviews7days', value: Number(currentPost[0][1]) })
    }
  }
};


const createPosts = require('./gatsby/createPosts');
const createPages = require('./gatsby/createPages');
const createCategories = require('./gatsby/createCategories');
const createAuthors = require('./gatsby/createAuthors');

exports.createPages = async ({ actions, graphql }) => {
  await createPosts({ actions, graphql });
  await createPages({ actions, graphql });
  await createCategories({ actions, graphql });
  await createAuthors({ actions, graphql });
}
