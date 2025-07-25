import Navbar from '../Navbar'

import './index.css'

const NotFound = () => (
  <div className="NotFound-container">
    <Navbar />
    <div className="NotFounds">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
        />
      </div>
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  </div>
)

export default NotFound
