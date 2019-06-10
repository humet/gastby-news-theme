import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import Helmet from 'react-helmet'
import { ContentfulFixedAsset } from "../components/ContentfulFixedAsset"

import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

class ArticlePostTemplate extends React.Component {
  render() {
    // Put all the post data into variables
    const post = get(this.props, 'data.contentfulPost')

    // Set up the Embedly react component
    const EmbedlyCode = ({ children }) => <div className="embed" dangerouslySetInnerHTML={{ __html: children }} />;

    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
          // Look for embedded entries in the Contentful feed
          const { embedCode } = node.data.target.fields; // Fetch the embedded entry details
          if(embedCode) {
            return <EmbedlyCode>{embedCode['en-US']}</EmbedlyCode>
          }
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          // Look for embedded assets in the Contentful feed
          const { title, description, file } = node.data.target.fields; // Fetch the asset details
          const { id } = node.data.target.sys; // Fetch the asset ID
          const mimeType = file['en-US'].contentType // Fetch the content type (image/jpeg, application/pdf etc.)
          const mimeGroup = mimeType.split('/')[0] // Split out just the main file type (image, applcation etc.)
    
          // Check what the file is and output HTML accordingly.
          switch (mimeGroup) {
            case 'image':
              return <ContentfulFixedAsset contentfulId={id} title={title}></ContentfulFixedAsset>
            case 'application':
              return <a
                alt={description ?  description['en-US'] : null}
                href={file['en-US'].url}
                >{ title ? title['en-US'] : file['en-US'].details.fileName }
              </a>
            default:
              return <span style={{backgroundColor: 'red', color: 'white'}}> {mimeType} embedded asset </span>
          }
          
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
