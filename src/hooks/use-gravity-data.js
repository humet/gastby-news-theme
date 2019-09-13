import { useStaticQuery, graphql } from "gatsby"

const AllGravityData = () => {
  const { allGfForm } = useStaticQuery(
    graphql`
      query {
        allGfForm {
          edges {
            node {
              formId
              slug
              apiURL
              descriptionPlacement
              formFields {
                id
                label
                description
                descriptionPlacement
                type
                choices
                content
                errorMessage
                inputMaskValue
                isRequired
                visibility
                cssClass
                placeholder
                size
                defaultValue
                maxLength
              }
              button {
                text
              }
              confirmations {
                message
              }
            }
          }
        }
      }
    `
  )
  return allGfForm
}

export default AllGravityData
