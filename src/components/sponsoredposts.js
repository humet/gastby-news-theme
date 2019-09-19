import React from "react"
import VisibilitySensor from 'react-visibility-sensor';
import { Location } from '@reach/router';

import ThemeStyles from "../styles/theme.js"
import "./sponsoredposts.scss"

const SponsoredPost = ( props ) => {
  const item = props.content
  return (
    <div
        style={{ position: `relative`, padding: `0 15px` }}
        className="articlepreview sponsoredposts--item"
      >
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <img src={item.image} alt={item.headline} width="100%" />
        </a>
        <div style={{ position: `relative`, top: `-40px`, width: "100%" }}>
          <div
            style={{
              background: `#fff`,
              padding: `15px`,
              width: `80%`,
              margin: `0 auto`,
              textAlign: `center`,
              border: ThemeStyles.borders.primary,
            }}
          >
            <div className="small" style={{ textTransform: `uppercase` }}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: ThemeStyles.colour.primary,
                  fontWeight: `bold`,
                  textDecoration: `none`,
                }}
              >
                {item.brand}
              </a>
            </div>
            <h3 style={{ marginBottom: `5px` }}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: ThemeStyles.colour.body,
                  textDecoration: `none`,
                }}
              >
                {item.headline}
              </a>
            </h3>
          </div>
        </div>
      </div>
  )
}

class SponsoredPosts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      content: "",
    }
  }

  componentDidMount() {
    fetch(
      "https://trends.revcontent.com/api/v2/multi.php?api_key=a12f1105728acbe7ec4e5e171a8b398e9ff29047&pub_id=93042&widget_id=114357&domain=fulltimedevils.com&sponsored+count=6"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            content: result.widgets[0],
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )
  }

  _onChange = (isVisible, url, location, creativeNumber) => {
    const encLocation = encodeURI(location.href)
    console.log(encLocation)
    if(isVisible) {
      fetch(
        url + "&referer=" + encLocation + "&p[]=" + creativeNumber
      )
    }
  };

  showRevcontent(data) {
    const items = data.content.map((item, index) => (
      <Location key={item.uid}>
      {({ location }) =>
      <VisibilitySensor onChange={isVisible => this._onChange(isVisible, data.view, location, index)}>
        <SponsoredPost content={item} />
      </VisibilitySensor>
      }
      </Location>
    ))

    return items
  }

  render() {
    const { error, isLoaded, content } = this.state
    let status

    if (error) {
      status = <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      status = <div>Loading...</div>
    } else {
      status = this.showRevcontent(content)
    }
    return (
      <section style={{ background: ThemeStyles.colour.primary }}>
        <h2
          style={{
            textTransform: `uppercase`,
            color: `#fff`,
            borderBottom: `#fff solid 3px`,
            paddingBottom: `15px`,
          }}
        >
          Sponsored Content
        </h2>
        <div className="sponsoredposts" style={{ margin: `0 -15px` }}>
          {status}
        </div>
      </section>
    )
  }
}

export default SponsoredPosts
