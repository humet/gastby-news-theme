require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const googleApiKey = process.env.GOOGLE_API_KEY.replace(new RegExp("\\\\n", "\g"), "\n")

module.exports = {
  siteMetadata: {
    title: `Full Time Devils`,
    description: `The World's Biggest Unoffical Manchester United Fan Channel`,
    domain: `https://www.fulltimedevils.com`, // No trailing slash
    author: `fulltimedevils`, // No @ symbol
    image: `/images/facebookopengraph.jpg` 
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "fulltimedevils.wpengine.com",
        protocol: "http",
        hostingWPCOM: false,
        verboseOutput: false,
        useACF: true,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-NJN3HTT",
        includeInDevelopment: false,
      },
    },
    {
      resolve: `gatsby-source-google-analytics-reporting-api`,
      options: {
        email: process.env.CLIENT_EMAIL,
        key: googleApiKey,
        viewId: `134027711`,
        startDate: '7daysAgo',
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
