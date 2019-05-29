import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

export default ({ article }) => (
  <div>
    <Link to={`/${article.slug}/`}><Img alt="" fluid={article.featuredImage.fluid} /></Link>
    <h3>
      <Link to={`/${article.slug}/`}>{article.title}</Link>
    </h3>
    <small>{article.publishDate}</small>
  </div>
)