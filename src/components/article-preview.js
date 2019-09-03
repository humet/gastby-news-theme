import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Categories from '../components/categories'

import ThemeStyles from '../styles/theme.js'
import './article-preview.scss'

import NoImage from '../images/NoImage.png';

export default ({ article }) => (
  <article style={{ position: `relative`}} className="articlepreview">
    <Link to={`/${article.slug}/`}>
    {article.featured_media && article.featured_media.localFile.childImageSharp.fluid.src ? (
      <Img fluid={article.featured_media.localFile.childImageSharp.fluid} alt={article.featured_media.alt_text} backgroundColor={ThemeStyles.colour.primary} />
    ) : (
      <img width="100%" src={NoImage} alt="Thumbnail Missing" />
    ) }
    </Link>
    <div style={{ position: `relative`, top: `-40px`, width: '100%' }}>
      <div style={{ background: `#fff`, padding: `15px`, width: `80%`, margin: `0 auto`, textAlign: `center`, border: ThemeStyles.borders.primary }}>
        {article.categories && article.categories.length ? (
          <Categories categories={article.categories} />
        ) : null}
        <h3 style={{marginBottom: `5px`}}>
          <Link to={`/${article.slug}/`} style={{ color: ThemeStyles.colour.body, textDecoration: `none`}}><span dangerouslySetInnerHTML={{ __html: article.title}} /></Link>
        </h3>
        <div dangerouslySetInnerHTML={{ __html: article.excerpt.slice(0, 90), }} />
      </div>
    </div>
    <small>{article.publishDate}</small>
  </article>
)