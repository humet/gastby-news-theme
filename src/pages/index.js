import React from "react"
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from "../components/layout"
import SEO from "../components/seo"
import CategoryBlock from '../components/categoryblock'

class IndexPage extends React.Component {
  render() {
    const posts = get(this, 'props.data.allWordpressPost.edges')
    
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <CategoryBlock articles={posts} type="featured" title="Featured" />
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery {
    allWordpressPost(limit: 10, sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          slug
          excerpt
          categories {
            name
            slug
          }
          featured_media {
            alt_text
            localFile{
              childImageSharp {
                fluid(maxWidth: 650) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`