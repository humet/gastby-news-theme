const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const articlePost = path.resolve('./src/templates/article.js')
    resolve(
      graphql(
        `
          {
            allWordpressPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const articles = result.data.allWordpressPost.edges
        articles.forEach((article, index) => {
          createPage({
            path: `/${article.node.slug}/`,
            component: articlePost,
            context: {
              slug: article.node.slug
            },
          })
        })
      })
    )
  })
}