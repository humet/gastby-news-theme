import React from "react"
import { StaticQuery } from "gatsby"
import { graphql } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSearch,
  faShoppingBasket,
  faBars,
} from "@fortawesome/free-solid-svg-icons"
import MainNav from "./mainnav"
import Search from "./search"

class QuickMenu extends React.Component {
  constructor() {
    super()
    this.state = {
      showSearch: false,
      openMenu: false,
    }
    this.showSearchHandler = this.showSearchHandler.bind(this)
    this.showSearchClick = this.showSearchClick.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  showSearchHandler() {
    this.setState({
      showSearch: false,
    })
  }

  showSearchClick() {
    this.setState({
      showSearch: true,
    })
  }

  toggleMenu() {
    this.setState(state => ({
      openMenu: !state.openMenu,
    }))
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SearchIndexQuery {
            siteSearchIndex {
              index
            }
          }
        `}
        render={data => (
          <div>
            <a
              href="https://shop.fulltimedevils.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faShoppingBasket} size="2x" />
            </a>
            <FontAwesomeIcon
              icon={faSearch}
              size="2x"
              onClick={this.showSearchClick}
              style={{ cursor: "pointer" }}
            />
            <FontAwesomeIcon
              icon={faBars}
              size="2x"
              onClick={this.toggleMenu}
              style={{ cursor: "pointer" }}
            />
            <Search
              searchIndex={data.siteSearchIndex.index}
              handler={this.showSearchHandler}
              showSearch={this.state.showSearch}
            />
            <MainNav menuOpen={this.state.openMenu} />
          </div>
        )}
      />
    )
  }
}

export default QuickMenu
