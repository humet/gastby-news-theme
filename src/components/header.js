import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Container from "./container"
import Nav from "./nav"
import "./header.scss"
import ThemeStyles from '../styles/theme.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faSearch,  faShoppingBasket, faBars } from '@fortawesome/free-solid-svg-icons'
import Logo from '../images/fulltimedevils-logo.svg';


const Header = ({ siteTitle }) => (
  <header
    style={{
      marginTop: `25px`,
    }}
  >
    <Container>
        <div className="brand" style={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
          paddingBottom: `15px`
        }}>
          <div>
            <Link to="/" >
              <img alt={siteTitle} src={Logo} width="130px" />
            </Link>
          </div>
          <div style={{
            color: ThemeStyles.colour.primary,
          }}>
            <a href="https://store.fulltimedevils.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faShoppingBasket} size="2x" /></a>
            <FontAwesomeIcon icon={faSearch} size="2x" />
            <FontAwesomeIcon icon={faBars} size="2x" />
          </div>
        </div>
    </Container>
    <div style={{
      display: `flex`,
      flexDirection: `column`
    }}>
    <div
      className="order-last"
      style={{
        backgroundColor: ThemeStyles.colour.primary,
        padding: `10px 0`,
        color: ThemeStyles.colour.light,
      }}
    >
      <Container>
        <div style={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`
        }}>
          <a target="_blank" rel="noopener noreferrer" style={{
              color: ThemeStyles.colour.light,
              textTransform: `uppercase`,
              fontWeight: `bold`,
              textDecoration: `none`
            }} href="https://www.whatsapp.com">Subscribe to Whatsapp</a>
            <a style={{
              color: ThemeStyles.colour.light
            }} href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} size="2x" /></a>
          </div>
      </Container>
    </div>
    <div style={{
      padding: `10px 0`,
      textAlign: `center`,
      textTransform: `uppercase`,
      color: ThemeStyles.colour.primary,
      fontWeight: `bold`,
      fontStyle: `italic`,
      borderBottom: ThemeStyles.borders.primary,
    }} className="hideDesktop">
      <Container>
        FTD Merchandise
      </Container>
    </div>
    <Nav />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
