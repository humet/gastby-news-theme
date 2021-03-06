import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CategoryBlock from "../components/categoryblock"

const CategoryTemplate = props => {
  const posts = props.data.allWordpressPost.edges
  return (
    <Layout>
      <SEO title={props.pageContext.name} />
      <div style={{ padding: `20px 30px 5px`, backgroundColor: `#fff` }}>
        <h1
          style={{ marginBottom: 0 }}
          dangerouslySetInnerHTML={{ __html: props.pageContext.name }}
        />
      </div>
      <CategoryBlock
        articles={posts}
        sticky
        type="featured"
        title={`Featured ${props.pageContext.name}`}
      />
      <CategoryBlock
        articles={posts}
        type="list"
        title={`More ${props.pageContext.name}`}
      />
    </Layout>
  )
}

export default CategoryTemplate

export const pageQuery = graphql`
  query category($slug: String) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(
      filter: {
        categories: { elemMatch: { slug: { eq: $slug } } }
        fields: { deploy: { eq: true } }
      }
    ) {
      edges {
        node {
          title
          slug
          excerpt
          sticky
          categories {
            name
            slug
          }
          featured_media {
            alt_text
            localFile {
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
