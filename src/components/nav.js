import React from "react"
import { Link, StaticQuery, graphql } from 'gatsby'
import UrlParts from "../hooks/getUrlParts.js"

import './nav.scss'

const Nav = () => (
    <StaticQuery
        query={graphql`
        query {
            allWordpressWpApiMenusMenusItems(filter: {slug: {eq: "main-menu"}}) {
              edges {
                node {
                  items {
                    title
                    object_id
                    type
                    url
                  }
                }
              }
            }
          }
        `}
        render={data=> (
            <nav className="main-nav">
            <ul>
                {data.allWordpressWpApiMenusMenusItems.edges[0].node.items.map(item => (
                    <li key={item.object_id}>
                    { item.type === "post_type" || item.type === "taxonomy" ? (
                        <Link to={UrlParts(item.url).pathname}>{item.title}</Link>
                    ) : (
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    ) }
                    </li>
                ))}
            </ul> 
            <div className="overlay"></div>
            </nav>
        )}
    />
)

export default Nav
