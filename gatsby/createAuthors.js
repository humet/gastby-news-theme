const _ = require(`lodash`)
const path = require(`path`)

/**
 * Create WordPress Author Pages
 */
module.exports = async ({ actions, graphql }) => {

  const { createPage } = actions
  const authorTemplate = path.resolve(`./src/templates/author.js`)

  return graphql(
    `
    {
      allWordpressWpUsers {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const authors = result.data.allWordpressWpUsers.edges;
    authors.forEach(author => {
      createPage({
        path: `/author/${author.node.slug}/`,
        component: authorTemplate,
        context: {
          id: author.node.id
        }
      })
    })

    // ==== END POSTS ====
    return null
  })
}