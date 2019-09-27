import React from "react"
import { DFPSlotsProvider, AdSlot } from "react-dfp"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Categories from "../components/categories"
import SEO from "../components/seo"
import SponsoredPosts from "../components/sponsoredposts"
import FacebookComments from "../components/facebookcomments"
import PopPosts from "../components/popposts"

import ThemeStyles from "../styles/theme.js"
import "./article.scss"

export const ArticleTemplate = ({
  content,
  categories,
  title,
  excerpt,
  date,
  author,
  featuredimage,
}) => {
  return (
    <DFPSlotsProvider 
      dfpNetworkId="21685689509" 
      collapseEmptyDivs lazyLoad={{ fetchMarginPercent: 200, renderMarginPercent: 100, mobileScaling: 2.0 }}>
      <div className="ads-atf">
        <div className="ad desktop-ads">
          <AdSlot
            sizes={[[970, 250], [970, 90], [728, 90]]}
            sizeMapping={[{ viewport: [0, 0], sizes: [] },
                          { viewport: [768, 0], sizes: [[728, 90]] },
                          { viewport: [970, 0], sizes: [[970, 250], [970, 90], [728, 90]] }]}
            adUnit="ftd_atf_leaderboard_desktop"
          />
        </div>
        <div className="ad mobile-ads">
          <AdSlot
            sizes={[[300, 250], [336, 280]]}
            sizeMapping={[{ viewport: [0, 0], sizes: [[300, 250], [336, 280]] },
                          { viewport: [768, 0], sizes: [] }]}
            adUnit="ftd_atf_leaderboard_mobile"
          />
        </div>
      </div>
      <section className="entry-content">
        <div className="meta">
          {categories && categories.length ? (
            <Categories categories={categories} />
          ) : null}

          <h1
            className="section-headline"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div dangerouslySetInnerHTML={{ __html: excerpt }} />

          <div className="meta__dateauthor">
            <div
              className="small meta__date"
              style={{ fontWeight: `bold`, color: ThemeStyles.colour.primary }}
            >
              {date}
            </div>
            {author ? (
              <div
                className="small"
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "15px 0",
                }}
              >
                {author.avatar_urls.wordpress_96 ? (
                  <div style={{ marginRight: "10px" }}>
                    <img
                      style={{ borderRadius: `60px` }}
                      width="60px"
                      height="60px"
                      alt={author.name}
                      src={author.avatar_urls.wordpress_96.source_url}
                    />
                  </div>
                ) : null}
                <div>
                  <Link
                    to={`/author/${author.slug}/`}
                    style={{
                      textTransform: `uppercase`,
                      fontWeight: `bold`,
                      textDecoration: `none`,
                    }}
                  >
                    By {author.name}
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-8">
            {featuredimage ? (
              <div style={{ marginBottom: `15px` }}>
                <Img
                  fluid={featuredimage.localFile.childImageSharp.fluid}
                  alt={featuredimage.alt_text}
                  backgroundColor={ThemeStyles.colour.primary}
                />
                {featuredimage.caption ? (
                  <small
                    dangerouslySetInnerHTML={{
                      __html: featuredimage.caption,
                    }}
                  />
                ) : null}
              </div>
            ) : null}

            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
              <div className="ad desktop-ads">
                <AdSlot
                  sizes={[[300, 250], [336, 280]]}
                  sizeMapping={[{ viewport: [0, 0], sizes: [] },
                                { viewport: [768, 0], sizes: [[300, 250], [336, 280]] }]}
                  adUnit="ftd_article_end_desktop"
                />
              </div>
              <div className="ad mobile-ads">
                <AdSlot
                  sizes={[[300, 250], [336, 280]]}
                  sizeMapping={[{ viewport: [0, 0], sizes: [[300, 250], [336, 280]] },
                                { viewport: [768, 0], sizes: [] }]}
                  adUnit="ftd_article_end_mobile"
                />
              </div>
            <h2>What do you think?</h2>
            <FacebookComments />
          </div>
          <aside className="col-4 hideMobile">
            <div className="sidebar">
              <div className="ad desktop-ads">
                <AdSlot
                  sizes={[[300, 600], [336, 280], [300, 250]]}
                  sizeMapping={[{ viewport: [0, 0], sizes: [] },
                                { viewport: [768, 0], sizes: [[300, 600], [300, 250], [336, 280]] }]}
                  adUnit="ftd_top_of_sidebar_desktop"
                />
              </div>
            <PopPosts />
            </div>
          </aside>
        </div>
      </section>
      <SponsoredPosts />
    </DFPSlotsProvider>
  )
}

const Article = ({ data }) => {
  const { wordpressPost: post, wordpressWpUsers: author, site: siteMeta } = data
  const description = post.excerpt.replace(/<[^>]*>?/gm, "")

  // Add Embedly script for embeds on client side only
  if (typeof window !== "undefined" && post.content.search("embedly")) {
    let init_embedly = function(w, d) {
      var id = "embedly-platform",
        n = "script"
      if (!d.getElementById(id)) {
        w.embedly =
          w.embedly ||
          function() {
            ;(w.embedly.q = w.embedly.q || []).push(arguments)
          }
        var e = d.createElement(n)
        e.id = id
        e.async = 1
        e.src =
          ("https:" === document.location.protocol ? "https" : "http") +
          "://cdn.embedly.com/widgets/platform.js"
        var s = d.getElementsByTagName(n)[0]
        s.parentNode.insertBefore(e, s)
      }
    }
    init_embedly(window, document)
  }

  return (
    <Layout>
      <SEO
        title={post.title}
        article
        pathname={post.slug}
        author={author.acf.social_media_handles.twitter}
        description={description}
        image={
          post.featured_media
            ? post.featured_media.localFile.childImageSharp.fluid.src
            : siteMeta.siteMetadata.image
        }
      />
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
  query BlogPostByID($id: String!, $authorid: String!) {
    site {
      siteMetadata {
        title
        image
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
          wordpress_96 {
            source_url
          }
        }
      }
      featured_media {
        alt_text
        caption
        localFile {
          childImageSharp {
            fluid(maxWidth: 650) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
    wordpressWpUsers(id: { eq: $authorid }) {
      acf {
        social_media_handles {
          twitter
        }
      }
    }
  }
`
