import React from 'react'

import { siteMetadata } from '../../gatsby-config'
import Layout from 'components/Layout'
import Meta from 'components/Meta'
import App from 'components/App'

class Index extends React.Component {
  render() {
    const { location } = this.props
    return (
      <div className="container">
        <Layout location={location}>
          <Meta site={siteMetadata} title="Tweet with Confidence" />
          <App />
        </Layout>
      </div>
    )
  }
}

export default Index
