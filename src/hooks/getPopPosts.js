import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      query PopPosts {
        allPageViews(limit: 10, sort: { fields: totalCount, order: DESC }) {
          edges {
            node {
              path
              totalCount
            }
          }
        }
      }
    `}
    render={data => (
      <ul>
        {data.allPageViews.edges.map(post => (
          <li key={post.node.path}>{post.node.path}</li>
        ))}
      </ul>
    )}
  />
)
