import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {AiFillCalendar} from 'react-icons/ai'
import NavBar from '../Navbar'
import SimilarJob from '../SimilarJob'
import './index.css'

const stagesForConditionChecking = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  load: 'LOADER',
}
class JobDetails extends Component {
  state = {
    jobDescriptions: {},
    similarJobs: [],
    similarJobsApi: 'INITIAL',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({similarJobsApi: stagesForConditionChecking.load})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    console.log('API response status:', response.status)
    if (response.ok) {
      const data = await response.json()
      console.log('Fetched job details:', data)
      const jobDetailsData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const similarJobsData = data.similar_jobs.map(job => ({
        companyLogoUrls: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobDescriptions: jobDetailsData,
        similarJobs: similarJobsData,
        similarJobsApi: stagesForConditionChecking.success,
      })
    } else {
      console.error('API call failed')
      this.setState({similarJobsApi: stagesForConditionChecking.failure})
    }
  }

  loaderViewProfile = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  onSuccessView = () => {
    const {jobDescriptions, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills = [],
      lifeAtCompany = [],
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDescriptions
    console.log(skills)
    return (
      <div>
        <div className="jobs-cart-containers">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="description-heading-container">
            <h1 className="description-heading">Description</h1>
            <a href={companyWebsiteUrl} className="anchor-tag">
              Visit <FaExternalLinkAlt className="link" />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skill-ul-container">
            {skills.map(each => (
              <li className="skill-li-container" key={each.name}>
                <img
                  className="skill-logo"
                  src={each.image_url}
                  alt={each.name}
                />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="lifeAtCompany-container">
            <div className="lifeAtCompany.para">
              <p>{lifeAtCompany.description}</p>
            </div>
            <img
              className="lifeAtCompany-image"
              src={lifeAtCompany.image_url}
              alt=""
            />
          </div>
        </div>
        <h1 style={{color: 'white', marginLeft: '40px'}}>Similar Jobs</h1>
        <ul className="similar-job-ul">
          {similarJobs.map(each => (
            <SimilarJob similar={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {similarJobsApi} = this.state

    let content
    switch (similarJobsApi) {
      case stagesForConditionChecking.success:
        content = this.onSuccessView()
        break
      case stagesForConditionChecking.failure:
        content = this.onFailureView()
        break
      case stagesForConditionChecking.load:
        content = this.loaderViewProfile()
        break
      default:
        content = null
    }

    return (
      <div>
        <NavBar />
        {content}
      </div>
    )
  }
}
export default JobDetails
