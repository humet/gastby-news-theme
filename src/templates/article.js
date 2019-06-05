import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import Embedly from '../components/embedly'

import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

class ArticlePostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulPost')

    const EmbedlyCode = ({ children }) => <div className="embed" dangerouslySetInnerHTML={{ __html: children }} />;

    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
          const embedMarkup = node.data.target.fields.embedCode['en-US'];
          return <EmbedlyCode>{embedMarkup}</EmbedlyCode>
        },
      }
    }

    return (
      <Layout location={this.props.location} >
            
            <Embedly />

            <h1 className="section-headline">{post.title}</h1>
            <p dangerouslySetInnerHTML={{
                __html: post.description.description,
              }} />
            <hr />
            {documentToReactComponents(post.content.json, options)}
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
      description {
        description
      }
      content {
        json
      }
    }
  }
`
