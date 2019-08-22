import React from 'react'
import ArticlePreview from './article-preview'

export default ({ articles, title }) => (
  <section>
    <h2>{title}</h2>
    {articles.map(({ node }) => {
        return (
          <div key={node.slug}>
            <ArticlePreview article={node} />
          </div>
        )
      })}
  </section>
)
