import React from 'react'
import PropTypes from 'prop-types'
import ArticlePreview from './article-preview'

import { graphql } from 'gatsby'

import './categoryblock.scss'
import ThemeStyles from '../styles/theme';

export default class IndexPage extends React.Component {
  render() {
    const { articles, title } = this.props

    return (
      <section>
        {title &&
        <h2 dangerouslySetInnerHTML={{__html: title}} style={{textTransform: `uppercase`, borderBottom: ThemeStyles.borders.light, paddingBottom: 15}} />
        }
        <div className={`posts posts__${this.props.type}`}>
          {articles
            .filter(({ node }) => node.sticky === this.props.sticky)
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
  }
}

IndexPage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  type: PropTypes.string,
  sticky: PropTypes.bool,
}

export const pageQuery = graphql`
  fragment CategoryBlockFields on wordpress__POST {
    title
    slug
    excerpt
    categories {
      name
      slug
    }
    sticky
    featured_media {
      alt_text
      localFile{
        childImageSharp {
          fluid(maxWidth: 650) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  }
`