import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const ProfileCart = ({
  profileDetail,
  onChangeSalaryRange,
  onChangeEmploymentType,
}) => {
  const {name, profileImageUrl, shortBio} = profileDetail

  return (
    <div className="profile-content">
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="profile-name">{name}</h1>
        <p className="shortBio">{shortBio}</p>
      </div>
      <hr className="section-divider" />
      <h1>Type of Employment</h1>
      <ul className="ul-list-items">
        {employmentTypesList.map(each => (
          <li key={each.label}>
            <input
              type="checkbox"
              className="input-check"
              value={each.label}
              onChange={onChangeEmploymentType}
            />
            <label>{each.label}</label>
          </li>
        ))}
      </ul>
      <hr className="section-divider" />
      <h1>Salary Range</h1>
      <ul className="ul-list-items">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId}>
            <input
              className="input-check"
              type="radio"
              name="salary"
              value={each.label}
              onChange={onChangeSalaryRange}
            />
            <label>{each.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProfileCart
