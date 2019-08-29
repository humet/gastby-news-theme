import React from 'react'
import { Link } from 'gatsby'

import ThemeStyles from '../styles/theme.js'

let count = 1;

function CategoryComma(props) {
  if(props.length > 1 && count < props.length) {
    count++
    return ", "
  } 
  return null;
}

export default ({ categories }) => (
    <div className="small" style={{ textTransform: `uppercase` }}>
        {
        categories.map(category => (
        <Link key={category.name} to={`/category/${category.slug}/`} style={{
            color: ThemeStyles.colour.primary,
            fontWeight: `bold`,
            textDecoration: `none`,
            }}>
            <span dangerouslySetInnerHTML={{__html: category.name}} />
            <CategoryComma length={categories.length} />
        </Link>
        ))}
    </div>
)