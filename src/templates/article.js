import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import Helmet from 'react-helmet'

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
            
            <Helmet>
              <script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>
            </Helmet>

            <h1 className="section-headline">{post.title}</h1>
            <p dangerouslySetInnerHTML={{
                __html: post.description.description,
              }} />
            <hr />
            { post.content ? documentToReactComponents(post.content.json, options) : null }
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
