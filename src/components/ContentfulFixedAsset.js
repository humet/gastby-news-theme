import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"

// Gatsby adds 'c' to entity id if it starts with a number.
function fixId(id) {
  if (id.length === 23 && id.startsWith("c")) {
    return id.slice(1)
  }
  return id;
}

export const ContentfulFixedAsset = ({ contentfulId, title }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulAsset {
        edges {
          node {
            contentful_id
            fluid(maxWidth: 800, background: "rgb:000000") {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  `)

  const image = data.allContentfulAsset.edges.find(
    edge => edge.node.contentful_id === fixId(contentfulId)
  )

  return <Image fluid={image.node.fluid} alt={title} />
}
export default ContentfulFixedAsset