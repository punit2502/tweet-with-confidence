import React from 'react'
import './style.scss'

const Footer = ({ title }) => (
  <div className="footer">
    <div className="container text-center">
      <p>
        &copy; 2019 {title} |{' '}
        <a
          href="https://github.com/punit2502/tweet-with-confidence"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </p>
    </div>
  </div>
)

export default Footer
