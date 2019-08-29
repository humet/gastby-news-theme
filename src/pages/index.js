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
        <CategoryBlock sticky articles={posts} type="featured" title="Featured News" />
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          ...CategoryBlockFields
        }
      }
    }
  }
`