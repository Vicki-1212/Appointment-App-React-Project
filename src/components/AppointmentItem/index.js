// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, updateFavouriteIcon} = props
  const {id, title, date, isFavourite} = appointmentDetails

  const onClickFavoriteIcon = () => {
    updateFavouriteIcon(id)
  }

  const isFavouriteIcon = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-container">
      <div className="appointment-top-container">
        <p className="appointment-session">{title}</p>
        <button
          type="button"
          className="fav-button"
          data-testid="star"
          onClick={onClickFavoriteIcon}
        >
          <img src={isFavouriteIcon} className="starred-image" alt="star" />
        </button>
      </div>
      <p className="appointment-date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
