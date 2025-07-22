import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {AiFillCalendar} from 'react-icons/ai'
import './index.css'

const SimilarJob = ({similar}) => {
  const {
    companyLogoUrls,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similar
  return (
    <li className="similar-jobs-container">
      <div className="similar-job-header">
        <img
          src={companyLogoUrls}
          alt="similar job company logo"
          className="similar-job-logo"
        />
        <div>
          <h1 className="similar-job-title">{title}</h1>
          <div className="rating-container">
            <FaStar className="rating-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="loc-empt-container">
        <div className="loc-container">
          <IoLocationSharp />
          <p>{location}</p>
        </div>
        <div className="emp-container">
          <AiFillCalendar />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJob
