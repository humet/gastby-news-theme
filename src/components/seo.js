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

function SEO({ description, lang, meta, keywords, title, image, author }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            domain
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaImage = image || site.siteMetadata.image
  const twitterAuthor = author || site.siteMetadata.author

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={`${title} | ${site.siteMetadata.title}`} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={site.siteMetadata.domain + metaImage} />
      <meta name="twitter:card" content={metaDescription} />
      <meta name="twitter:creator" content={`@${twitterAuthor}`} />
      <meta name="twitter:title" content={`${title} | ${site.siteMetadata.title}`} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  author: PropTypes.string
}

export default SEO
