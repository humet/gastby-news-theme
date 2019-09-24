/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import he from "he"

function SEO({ description, article, title, image, author, pathname }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            image
          }
        }
      }
    `
  )

  const metaDescription = he.decode(description) || site.siteMetadata.description
  const metaImage = image || site.siteMetadata.image
  const twitterAuthor = author || site.siteMetadata.author
  const url = `${site.siteMetadata.siteUrl}/${pathname || "/"}`
  const siteTitle = title
    ? `${he.decode(title)} | ${site.siteMetadata.title}`
    : `${site.siteMetadata.title} | ${site.siteMetadata.description}`

  return (
    <Helmet encodeSpecialCharacters={true}>
      <html lang="en" />
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta
        property="og:image"
        content={site.siteMetadata.siteUrl + metaImage}
      />
      {(article ? true : null) && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${site.siteMetadata.author}`}></meta>
      <meta name="twitter:creator" content={`@${twitterAuthor}`} />
      <meta
        name="twitter:title"
        content={`${title} | ${site.siteMetadata.title}`}
      />
      <meta name="twitter:description" content={metaDescription} />
      <meta
        name="twitter:image"
        content={site.siteMetadata.siteUrl + metaImage}
      ></meta>
    </Helmet>
  )
}

SEO.defaultProps = {
  description: ``,
  pathname: null,
  article: false,
}

SEO.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  author: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
}

export default SEO
