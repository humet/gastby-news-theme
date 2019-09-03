import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Categories from '../components/categories'
import SEO from "../components/seo"

import ThemeStyles from '../styles/theme.js'
import "./article.scss"

export const ArticleTemplate = ({
  content,
  categories,
  title,
  excerpt,
  date,
  author,
  featuredimage
}) => {
  return (
    <div>
    <section>
      <div className="meta">
        {categories && categories.length ? (
          <Categories categories={categories} />
        ) : null}
              
        <h1 className="section-headline">{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: excerpt, }} />

        <div className="meta__dateauthor">
          <div className="small meta__date" style={{ fontWeight: `bold`, color: ThemeStyles.colour.primary }}>{date}</div>
          {author ? (
          <div className="small" style={{display: 'flex', alignItems: 'center', margin: '15px 0'}}>
            <div style={{marginRight: '10px'}}><img style={{ borderRadius: `60px`}} width="60px" height="60px" alt={author.name} src={author.avatar_urls.wordpress_96} /></div>
            <div><Link to={`/author/${author.slug}/`} style={{textTransform: `uppercase`, fontWeight: `bold`, textDecoration: `none`}}>By {author.name}</Link></div>        
          </div>
          ) : null }
        </div>
        </div>
        <hr />
        <div className="row">
        <div className="col-12">
        {featuredimage ? (
          <div style={{marginBottom: `15px`}}>
            <Img fluid={featuredimage.localFile.childImageSharp.fluid} alt={featuredimage.alt_text} backgroundColor={ThemeStyles.colour.primary} />
            {featuredimage.caption ? (
            <small dangerouslySetInnerHTML={{
              __html: featuredimage.caption
            }} />
            ) : null }
          </div>
        ) : null }
      
            <div dangerouslySetInnerHTML={{
                __html: content,
              }} />
        </div>
        </div>
    </section>
    </div>
  )
}

const Article = ({ data }) => {
  const { wordpressPage: post } = data

  return (
    <Layout>
       <SEO title={post.title} />
      <ArticleTemplate
        content={post.content}
        title={post.title}
      />
    </Layout>
  )
}

Article.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Article

export const pageQuery = graphql`
  query PageByID($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    wordpressPage(id: { eq: $id }) {
      id
      title
      slug
      content
    }
  }
`
