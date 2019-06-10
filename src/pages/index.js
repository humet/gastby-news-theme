import React from "react"
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticlePreview from '../components/article-preview'

class IndexPage extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulPost.edges')
    
    return (
      <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Recent Articles</h1>
      <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulPost(limit: 10, sort: { fields: [publishedOn], order: DESC }) {
      edges {
        node {
          title
          slug
          featuredImage {
            fluid(maxWidth: 430, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_withWebp
             }
          }
        }
      }
    }
  }
`