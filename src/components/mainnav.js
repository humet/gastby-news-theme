import React from "react"
import { Link, StaticQuery, graphql } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import ThemeStyles from '../styles/theme.js'
import "./mainnav.scss"

var styles = {
  bmCrossButton: {
    height: '24px',
    width: '24px',
    top: '18px',
    right: '35px'
  },
  bmCross: {
    background: '#fff',
    height: '24px'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: 0
  },
  bmMenu: {
    background: ThemeStyles.colour.primary,
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmItemList: {
    color: '#fff',
    padding: '0.8em'
  },
  bmItem: {
    display: 'block',
    borderBottom: '#fff 1px solid',
    textTransform: 'uppercase'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    top: 0,
    left: 0
  }
}

const MainNav = (props) => (
    <StaticQuery
        query={graphql`
        query {
            allWordpressWpApiMenusMenusItems(filter: {slug: {eq: "full-menu"}}) {
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
            <Menu customBurgerIcon={ false } className={ "full-nav" } right styles={styles} isOpen={ props.menuOpen }>
              
                {data.allWordpressWpApiMenusMenusItems.edges[0].node.items.map(item => (
                  <div>
                  { item.type === "post_type" ? (
                  <Link id="{item.object_slug}" key={item.object_slug} to={`/${item.object_slug}`}>{item.title}</Link>
                  ) : (
                    <a href={item.url}>{item.title}</a>
                  ) }
                  </div>
                ))}
                <div><Link style={{ backgroundColor: '#fff', marginTop: '15px', paddingLeft: 15 }} to="/submit-content">Submit Content</Link></div>
            </Menu>
        )}
    />
)

export default MainNav
