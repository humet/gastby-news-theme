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
        <SEO />
        <CategoryBlock sticky articles={posts} type="featured" title="Featured" count={3} />
        <CategoryBlock articles={posts} type="list" title="Latest News" count={6} category={5} />
        <CategoryBlock articles={posts} type="list" title="Match Reviews" count={6} category={4} />
        <CategoryBlock articles={posts} type="list" title="Opinion & Debate" count={6} category={6} />
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