import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import ThemeStyles from '../styles/theme.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import './search.scss'

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.searchInput = React.createRef();
    this.state = {
      query: ``,
      results: [],
    }
  }

  componentDidUpdate() {
    if(this.props.showSearch) {
      this.searchInput.current.focus();
    }
  }

  render() {
    return (
    <div className="searchOverlay" style={{background: `rgba(0,0,0,0.75)`, position: `fixed`, width: `100%`, height: `100%`, top: 0, left: 0, zIndex: 9999, padding: `30px`, display: this.props.showSearch ? 'flex' : 'none', alignItems: `center`}}>
      <div style={{ background: ThemeStyles.colour.primary, width: `100%`, padding: 10, color: `#fff`, position: `relative`, boxShadow: `0 20px 30px 0 rgba(0,0,0,0.5)`, borderRadius: 30}}>
        <FontAwesomeIcon onClick = {this.props.handler} style={{ color: `#fff`, position: `absolute`, right: 0, bottom: '100%' }} icon={faTimesCircle} size="2x" />
        <input style={{width: `100%`, padding: `10px`, background: `transparent`, border: `none`, color: `#fff`}} type="text" value={this.state.query} onChange={this.search} placeholder="Type in something..." ref={this.searchInput} />
        <ul>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={page.path}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}