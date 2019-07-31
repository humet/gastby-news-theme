import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'

class ArticlePostTemplate extends React.Component {
  render() {
    // Put all the post data into variables
    const post = get(this.props, 'data.wordpressPost')

    return (
      <Layout location={this.props.location} >
            

            <h1 className="section-headline">{post.title}</h1>
            <p dangerouslySetInnerHTML={{
                __html: post.excerpt,
              }} />
            <hr />
            { post.content }
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
    wordpressPost(slug: { eq: $slug }) {
      title
      excerpt
      content 
    }
  }
`
