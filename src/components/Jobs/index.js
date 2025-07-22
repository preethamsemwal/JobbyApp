import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import NavBar from '../Navbar'
import JobsCart from '../JobsCart'
import ProfileCart from '../ProfileCart'

import './index.css'

const stagesForConditionChecking = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  load: 'LOADER',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profileDetails: {},
    selectedEmploymentTypes: [],
    selectedSalaryRange: '',
    stateDeclared: 'initial',
    searchResult: '',
    profileStateDeclared: 'initial',
  }

  componentDidMount() {
    this.getJobs()
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileStateDeclared: stagesForConditionChecking.load})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: profile,
        profileStateDeclared: stagesForConditionChecking.success,
      })
    } else {
      this.setState({profileStateDeclared: stagesForConditionChecking.failure})
    }
  }

  getJobs = async () => {
    this.setState({stateDeclared: stagesForConditionChecking.load})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updateData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: updateData,
        stateDeclared: stagesForConditionChecking.success,
      })
    } else {
      this.setState({stateDeclared: stagesForConditionChecking.failure})
    }
  }

  loaderViewProfile = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailureView = () => (
    <div className="profile-failure-view">
      <button type="button" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  renderProfileSection = () => {
    const {profileDetails, profileStateDeclared} = this.state

    switch (profileStateDeclared) {
      case stagesForConditionChecking.success:
        return (
          <ProfileCart
            profileDetail={profileDetails}
            onChangeEmploymentType={this.onChangeEmploymentType}
            onChangeSalaryRange={this.onChangeSalaryRange}
          />
        )

      case stagesForConditionChecking.failure:
        return this.renderProfileFailureView()
      case stagesForConditionChecking.load:
        return this.loaderViewProfile()
      default:
        return null
    }
  }

  onChangeSalaryRange = event => {
    this.setState({selectedSalaryRange: event.target.value})
  }

  onChangeEmploymentType = event => {
    const {value, checked} = event.target
    this.setState(prevState => {
      const updated = checked
        ? [...prevState.selectedEmploymentTypes, value]
        : prevState.selectedEmploymentTypes.filter(each => each !== value)
      return {selectedEmploymentTypes: updated}
    })
  }

  getFilteredJobs = () => {
    const {
      jobsList,
      selectedEmploymentTypes,
      selectedSalaryRange,
      searchResult,
    } = this.state

    return jobsList.filter(job => {
      const isEmploymentMatch =
        selectedEmploymentTypes.length === 0 ||
        selectedEmploymentTypes.includes(job.employmentType)
      const jobSalary = parseInt(job.packagePerAnnum.replace(/\D/g, ''))
      const isSalaryMatch =
        selectedSalaryRange === '' || jobSalary >= parseInt(selectedSalaryRange)

      const isSearchMatch =
        searchResult === '' ||
        job.title.toLowerCase().includes(searchResult.toLowerCase())

      return isEmploymentMatch && isSalaryMatch && isSearchMatch
    })
  }

  onSearchValue = event => {
    this.setState({searchResult: event.target.value})
  }

  onSuccessView = () => (
    <div className="jobs-profile-container">
      <div className="profile">{this.renderProfileSection()}</div>
      <div className="jobs">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search"
            onChange={this.onSearchValue}
            className="input-element"
          />
          <button
            type="button"
            className="search-button"
            data-testid="searchButton"
          >
            <FaSearch className="search-icon" />
          </button>
        </div>
        {this.getFilteredJobs().map(each => (
          <JobsCart jobsLists={each} key={each.id} />
        ))}
      </div>
    </div>
  )

  onFailedView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt=""
      />
      <h1>Oops! Somthing Went Wrong</h1>
      <p>We Cannot Seem to find the page you looking for.</p>
      <button type="button">Retry</button>
    </div>
  )

  render() {
    const {stateDeclared} = this.state

    let content
    switch (stateDeclared) {
      case stagesForConditionChecking.success:
        content = this.onSuccessView()
        break
      case stagesForConditionChecking.failure:
        content = this.onFailedView()
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
export default Jobs
