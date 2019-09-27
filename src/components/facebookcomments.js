import React from "react"
import { Comments, FacebookProvider } from "react-facebook"

const FACEBOOK_APP_ID = "2436617656427767"

class FacebookComments extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      subscribed: false,
      rendered: false,
    }

    this.timer = null
  }

  subscribeToFBEvent = () => {
    if (typeof window.FB !== undefined && !this.state.subscribed) {
      window.FB.Event.subscribe("xfbml.render", () => {
        this.setState({ rendered: true })
      })
      this.setState({ subscribed: true }, this.stopTimer)
    }
  }

  componentDidMount = () => {
    this.timer = setInterval(this.subscribeToFBEvent, 300)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { rendered } = this.state

    return (
      <>
        {!rendered && <p>Loading...</p>}
        <FacebookProvider appId={FACEBOOK_APP_ID}>
          <Comments />
        </FacebookProvider>
      </>
    )
  }
}

export default FacebookComments
