
import React from 'react'
import ThemeStyles from '../styles/theme.js'

class SponsoredPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      content: ''
    };
  }

  componentDidMount() {
    fetch("https://trends.revcontent.com/api/v2/?api_key=a12f1105728acbe7ec4e5e171a8b398e9ff29047&pub_id=93042&widget_id=114357&domain=fulltimedevils.com", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        this.setState({
          isLoaded: true,
          content: result.content
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    const { error, isLoaded, content } = this.state;
    let status
    
    if(error) {
      status = <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      status = <div>Loading...</div>
    } else {
      status = <p>LOADED</p>
    }
    return(
    <section style={{background: ThemeStyles.colour.primary}}>
      <h2 style={{ textTransform: `uppercase`, color: `#fff`, borderBottom: `#fff solid 3px`, paddingBottom: `15px`}}>Sponsored Content</h2>
      {status}
    </section>
    )
  }
}

export default SponsoredPosts