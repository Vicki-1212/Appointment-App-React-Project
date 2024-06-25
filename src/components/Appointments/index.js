// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  filterData = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  updateFavouriteIcon = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavourite: !eachAppointment.isFavourite}
        }
        return eachAppointment
      }),
    }))
  }

  updateNewAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isFavourite: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  updateTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  updateDate = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredDetails = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isFavourite === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter' : 'noFilter'
    const filteredAppointmentList = this.getFilteredDetails()
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="top-container">
            <form
              className="form-container"
              onSubmit={this.updateNewAppointment}
            >
              <h1 className="top-heading">Add Appointment</h1>
              <label htmlFor="input-text" className="label">
                TITLE
              </label>
              <input
                type="text"
                placeholder="Title"
                id="input-text"
                className="input"
                onChange={this.updateTitle}
                value={titleInput}
              />
              <label htmlFor="date-input" className="label">
                DATE
              </label>
              <input
                type="date"
                id="date-input"
                className="input"
                onChange={this.updateDate}
                value={dateInput}
              />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="top-image"
              alt="appointments"
            />
          </div>
          <div className="line-break">
            <hr />
          </div>
          <div className="bottom-container">
            <div className="stared-container">
              <h1 className="bottom-heading">Appointments</h1>
              <button
                className={`starred-button ${filterClassName}`}
                type="button"
                onClick={this.filterData}
              >
                starred
              </button>
            </div>
            <ul className="result-container">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  updateFavouriteIcon={this.updateFavouriteIcon}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
