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
        <SEO title="Home" />
        <CategoryBlock sticky articles={posts} type="featured" title="Featured News" count={3} />
        <CategoryBlock articles={posts} type="list" title="Latest News" count={6} />
        <CategoryBlock articles={posts} type="list" title="Match Reviews" count={6} category={4} />
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery {
    allWordpressPost(
      sort: { fields: [date], order: DESC }
      filter: {
        fields: {
          deploy: {eq: true}
        }
      }
    )
  {
      edges {
        node {
          ...CategoryBlockFields
        }
      }
    }
  }
`