require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const googleApiKey = process.env.GOOGLE_API_KEY.replace(new RegExp("\\\\n", "\g"), "\n")

module.exports = {
  siteMetadata: {
    title: `Full Time Devils`,
    description: `The World's Biggest Unoffical Manchester United Fan Channel`,
    siteUrl: `https://www.fulltimedevils.com`, // No trailing slash
    author: `fulltimedevils`, // No @ symbol
    image: `/images/facebookopengraph.jpg` 
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
      iubendaOptions: {"lang":"en","siteId":1662385,"enableCMP":true,"googleAdsPreferenceManagement":true,"cookiePolicyId":20096630, "banner":{ "acceptButtonDisplay":true,"customizeButtonDisplay":true,"position":"float-top-center" }}},
      // optional, if present, a Google Tag Manager event ("iubenda_consent_given") is triggered
      googleTagManagerOptions: true
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Full Time Devils`,
        short_name: `FTD`,
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
