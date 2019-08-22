import React from "react"
import { Link, StaticQuery, graphql } from 'gatsby'

import Container from "./container"

import Logo from '../images/fulltimedevils-logo.svg'

import './footer.scss'

const Footer = ({ siteTitle }) => (
    <footer>
          <Container>
            <section style={{textAlign: `center`, paddingTop: `50px`}}>
            <Link to="/" >
              <img alt={siteTitle} src={Logo} width="130px" style={{marginBottom: `30px`}} />
            </Link>
            <p style={{ textTransform: `uppercase`, fontWeight: 'bold'}}>{siteTitle} { new Date().getFullYear() }</p>
            <StaticQuery
        query={graphql`
        query {
            allWordpressWpApiMenusMenusItems(filter: {slug: {eq: "footer-menu"}}) {
              edges {
                node {
                  items {
                    title
                    object_slug
                    type
                    url
                  }
                }
              }
            }
          }
        `}
        render={data=> (
            <nav className="footer-nav">
            <ul>
                {data.allWordpressWpApiMenusMenusItems.edges[0].node.items.map(item => (
                    <li key={item.object_slug}>
                    { item.type === "post_type" ? (
                        <Link to={`/${item.object_slug}`}>{item.title}</Link>
                    ) : (
                        <a href={item.url}>{item.title}</a>
                    ) }
                    </li>
                ))}
            </ul> 
            <div className="overlay"></div>
            </nav>
        )}
    />
            </section>
          </Container>
        </footer>
)

export default Footer
