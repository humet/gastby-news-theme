module.exports = {
  siteMetadata: {
    title: `Full Time Devils`,
    description: `Base theme for the Social Chain Media Websites`,
    author: `@humet`,
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "fulltimedevils.wpengine.com",
        protocol: "http",
        hostingWPCOM: false,
      },
    },
    `gatsby-plugin-sharp`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
