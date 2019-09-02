import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GetPolicy from "../hooks/getPolicy"

class CookiePolicy extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Cookie Policy" />
         <section><GetPolicy id="20096630/cookie-policy" /></section>
      </Layout>
    )
  }
}

export default CookiePolicy
