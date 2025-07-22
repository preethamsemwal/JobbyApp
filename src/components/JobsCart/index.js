import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {AiFillCalendar} from 'react-icons/ai'

import './index.css'

const JobsCart = props => {
  const {jobsLists} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = jobsLists

  return (
    <Link className="link-container" to={`/jobs/${id}`}>
      <div className="jobs-cart-container">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="logo-container-heading">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <FaStar style={{color: 'yellow'}} />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="loc-pac-empt-container">
          <div className="loc-empt-container">
            <div className="loc-container">
              <IoLocationSharp style={{color: '#ffffff'}} />
              <p className="location">{location}</p>
            </div>
            <div className="emp-container">
              <AiFillCalendar style={{color: '#ffffff'}} />
              <p className="employmentType">{employmentType}</p>
            </div>
          </div>
          <p className="packagePerAnnum">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobsCart
