import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GetPolicy from "../hooks/getPolicy"

class PrivacyPolicy extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Privacy Policy" />
         <section><GetPolicy id="20096630" /></section>
      </Layout>
    )
  }
}

export default PrivacyPolicy
