import React from "react"
import PropTypes from "prop-types"
import ArticlePreview from "./article-preview"

import { graphql } from "gatsby"

import "./categoryblock.scss"
import ThemeStyles from "../styles/theme"

export default class IndexPage extends React.Component {
  render() {
    const {
      articles,
      title,
      sticky,
      type,
      count,
      category,
      hideSticky,
    } = this.props
    if (articles.length) {
      return (
        <section>
          {title && (
            <h2
              dangerouslySetInnerHTML={{ __html: title }}
              style={{
                textTransform: `uppercase`,
                borderBottom: ThemeStyles.borders.light,
                paddingBottom: 15,
              }}
            />
          )}
          <div className={`posts posts__${type}`}>
            {articles
              .filter(({ node }) => {
                if (sticky && !node.sticky) {
                  return false
                } else if (hideSticky && node.sticky) {
                  return true
                } else {
                  return true
                }
              })
              .filter(({ node }) => {
                let hasCat = false
                if (typeof category == "undefined") {
                  hasCat = true
                }
                for (var i = 0; i < node.categories.length; i++) {
                  if (node.categories[i]["wordpress_id"] === category) {
                    hasCat = true
                    break
                  }
                }
                return hasCat
              })
              .filter(({ node }, index) => index < count)
              .map(({ node }) => {
                return (
                  <div key={node.slug}>
                    <ArticlePreview article={node} />
                  </div>
                )
              })}
          </div>
        </section>
      )
    } else {
      return <div></div>
    }
  }
}

IndexPage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  type: PropTypes.string,
  sticky: PropTypes.bool,
  count: PropTypes.number,
  category: PropTypes.number,
  hideSticky: PropTypes.bool,
}

IndexPage.defaultProps = {
  sticky: false,
  hideSticky: false,
  count: 9999,
}

export const pageQuery = graphql`
  fragment CategoryBlockFields on wordpress__POST {
    title
    slug
    excerpt
    date(formatString: "D MMMM YYYY")
    categories {
      name
      slug
      wordpress_id
    }
    sticky
    featured_media {
      alt_text
      localFile {
        childImageSharp {
          fluid(maxHeight: 676) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  }
`
