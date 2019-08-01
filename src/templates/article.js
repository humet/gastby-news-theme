import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import ThemeStyles from '../styles/theme.js'
import "./article.scss"

let count = 1;

function CategoryComma(props) {
  if(props.length > 1 && count < props.length) {
    count++
    return ", "
  } 
  return null;
}

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
        <div className="small" style={{ textTransform: `uppercase` }}>
          {
            categories.map(category => (
          <Link key={category.name} to={`/${category.slug}/`} style={{
                color: ThemeStyles.colour.primary,
                fontWeight: `bold`,
                textDecoration: `none`,
              }}>
                {category.name}
                <CategoryComma length={categories.length} />
          </Link>
          ))}
        </div>
        ) : null}
              
        <h1 className="section-headline">{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: excerpt, }} />
        <div className="small" style={{ fontWeight: `bold`, color: ThemeStyles.colour.primary }}>{date}</div>
        {author ? (
        <div className="small" style={{display: 'flex', alignItems: 'center', margin: '15px 0'}}>
          <div style={{marginRight: '10px'}}><img style={{ borderRadius: `60px`}} width="60px" alt={author.name} src={author.avatar_urls.wordpress_96} /></div>
          <div><Link to={`/author/${author.slug}/`} style={{textTransform: `uppercase`, fontWeight: `bold`, textDecoration: `none`}}>By {author.name}</Link></div>        
        </div>
        ) : null }
        </div>
        <hr />
        <div className="row">
        <div className="col-8">
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
        <aside className="col-4 hideMobile">
          <h2>Popular Posts</h2>
        </aside>
        </div>
    </section>
    <section style={{background: ThemeStyles.colour.primary}}>
      <h2 style={{ textTransform: `uppercase`, color: `#fff`, borderBottom: `#fff solid 3px`, paddingBottom: `15px`}}>Sponsored Content</h2>
    </section>
    </div>
  )
}

const Article = ({ data }) => {
  const { wordpressPost: post } = data

  return (
    <Layout>
      <Helmet title={`${post.title} | Blog`} />
      <ArticleTemplate
        content={post.content}
        excerpt={post.excerpt}
        categories={post.categories}
        title={post.title}
        date={post.date}
        author={post.author}
        featuredimage={post.featured_media}
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
  query BlogPostByID($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    wordpressPost(id: { eq: $id }) {
      id
      title
      slug
      content
      date(formatString: "D MMMM YYYY")
      categories {
        name
        slug
      }
      excerpt
      author {
        name
        slug
        avatar_urls {
          wordpress_96
        }
      }
      featured_media {
        alt_text
        caption
        localFile{
          childImageSharp {
            fluid(maxWidth: 650) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
