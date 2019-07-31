import React from "react"
import { Link, StaticQuery, graphql } from 'gatsby'

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
            <nav>
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
)

export default Nav
