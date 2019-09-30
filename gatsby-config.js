require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const googleApiKey = process.env.GOOGLE_API_KEY.replace(new RegExp("\\\\n", "\g"), "\n")

/**
 * --- CONFIG VARIABLES ---
 * 
 * Fill out these for your own set up
 * 
 */

 /**
  * SEO
  */
 const siteTitle = `Full Time Devils`
 const siteShortTitle = `FTD`
 const siteDescription = `The World's Biggest Unoffical Manchester United Fan Channel`
 const siteUrl = `https://www.fulltimedevils.com` // No trailing slash
 const siteAuthor = `fulltimedevils` // This is a Twitter account. No @ symbol
 const siteImage = `/static/images/facebookopengraph.jpg` // Used for the default Facebook Open Graph image

 /**
  * Google Config
  */
 const googleTagManageId = `GTM-NJN3HTT`
 const googleAnalyticsViewId = `201141234`

 /**
  * Iubenda
  */
 const iubendaConfig = {"lang":"en","siteId":1662385,"enableCMP":true,"googleAdsPreferenceManagement":true,"cookiePolicyId":20096630, "banner":{ "acceptButtonDisplay":true,"customizeButtonDisplay":true,"position":"float-top-center" }}

 /**
 * --- END CONFIG VARIABLES ---
 */

module.exports = {
  siteMetadata: {
    title: siteTitle,
    description: siteDescription,
    siteUrl: siteUrl,
    author: siteAuthor,
    image: siteImage,
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "fulltimedevils.wpengine.com",
        protocol: "https",
        hostingWPCOM: false,
        verboseOutput: false,
        useACF: true,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: googleTagManageId,
        includeInDevelopment: false,
      },
    },
    {
      resolve: `gatsby-source-google-analytics-reporting-api`,
      options: {
        email: process.env.CLIENT_EMAIL,
        key: googleApiKey,
        viewId: googleAnalyticsViewId,
        startDate: '7daysAgo',
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-image`,
    {
      resolve: "gatsby-plugin-netlify-cache"
    },
    `gatsby-plugin-sass`,
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type allWordpressPost, list how to resolve the fields` values
          wordpress__POST: {
            title: node => node.title,
            path: node => node.path,
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-iubenda-cookie-footer',
      options: {
        iubendaOptions: iubendaConfig,
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteTitle,
        short_name: siteShortTitle,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#D83027`,
        display: `standalone`,
        icon: `static/images/icon.png`,
      },
    },
     `gatsby-plugin-offline`,
     `gatsby-plugin-sitemap`,
  ],
}
