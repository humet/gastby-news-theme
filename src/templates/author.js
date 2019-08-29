import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"
import CategoryBlock from '../components/categoryblock'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

import ThemeStyles from '../styles/theme.js'
import "./author.scss"

const AuthorTemplate = props => {
  const { data } = props
  const { authored_wordpress__POST, name } = data.wordpressWpUsers
  const title = `Posts by ${name}`
  const avatar_url = data.wordpressWpUsers.avatar_urls.wordpress_96
  const description = data.wordpressWpUsers.description
  let { jobtitle, instagram, twitter } = ""

  if(data.wordpressWpUsers.acf) {
    jobtitle = data.wordpressWpUsers.acf.job_title
    instagram = data.wordpressWpUsers.acf.social_media_handles.instagram
    twitter = data.wordpressWpUsers.acf.social_media_handles.twitter
  }

  // The `authored_wordpress__POST` returns a simple array instead of an array
  // of edges / nodes. We therefore need to convert the array here.
  const posts = authored_wordpress__POST.map(post => ({
    node: post,
  }))

  function socialIcons() {
    if(instagram || twitter) {
      return (
        <span className='social_icons'>
         { instagram &&
            <a href={`https://www.instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="social-icon" icon={faInstagram} size="2x" /></a>
          }
          { twitter &&
            <a href={`https://www.twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="social-icon" icon={faTwitter} size="2x" /></a>
        }
        </span>
    )
    }
  }

  return (
    <Layout>
      <SEO title={name} />
      <section className="author">
        <img src={ avatar_url } alt={name} style={{ borderRadius: `60px`}} width="60px" height="60px" />
        <h1 style={{ textTransform: 'uppercase', color: ThemeStyles.colour.primary}}>{name}</h1>
        { jobtitle &&
          <div style={{ textTransform: 'uppercase', marginBottom: 15}}>{ jobtitle }</div>
        }
        { socialIcons() }
        { description &&
        <p>{ description }</p>
        }
      </section>
      <section>
        <h2 style={{textTransform: `uppercase`}}>Want to get in touch?</h2>
        <hr />
      </section>
      <CategoryBlock articles={posts} type="list" title={title} />
    </Layout>
  )
}

export default AuthorTemplate

export const pageQuery = graphql`
  query author($id: String) {
    wordpressWpUsers(id: { eq: $id }) {
      name
      avatar_urls {
        wordpress_96
      }
      description
      authored_wordpress__POST {
        ...CategoryBlockFields
      }
      acf {
        job_title
        social_media_handles {
          instagram
          twitter
        }
      }
    }
  }
`