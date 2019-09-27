import React from "react"
import { StaticQuery, graphql } from "gatsby"
import ArticlePreview from "./article-preview"

import "./popposts.scss"

export default () => (
  <div>
    <h2>Popular Posts</h2>
    <StaticQuery
      query={graphql`
        query popposts {
          allWordpressPost(
            sort: { fields: fields___pageviews7days, order: DESC }
            limit: 5
          ) {
            edges {
              node {
                ...CategoryBlockFields
              }
            }
          }
        }
      `}
      render={data => (
        <ul className="popposts">
          {data.allWordpressPost.edges.map(post => (
            <li key={post.node.id}>
              <ArticlePreview article={post.node} noExcerpt />
            </li>
          ))}
        </ul>
      )}
    />
  </div>
)
