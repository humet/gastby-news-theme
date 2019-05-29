import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'

class ArticlePostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulPost')

    return (
      <Layout location={this.props.location} >
            <h1 className="section-headline">{post.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.body,
              }}
            />
      </Layout>
    )
  }
}

export default ArticlePostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost(slug: { eq: $slug }) {
      title
      body {
        body
      }
    }
  }
`