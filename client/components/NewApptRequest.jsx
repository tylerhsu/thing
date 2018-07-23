import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateField } from 'react-date-picker';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import { createAppointment, shape as appointmentsShape } from '../reducers/appointments';
import { fetchPatient, shape as patientShape } from '../reducers/patient';
import { fetchDoctors, shape as doctorsShape } from '../reducers/doctors';

import 'react-date-picker/index.css';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 300,
  },
  formRow: {
    minWidth: 200,
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 12,
  },
  error: {
    color: 'red'
  }
};

class NewApptRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '', // eslint-disable-line react/no-unused-state
      dateMoment: {}, // eslint-disable-line react/no-unused-state
      purpose: '',
      doctor_id: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (!this.props.doctors.payload && !this.props.doctors.loading) {
      this.props.fetchDoctors();
    }

    if (!this.props.patient.payload && !this.props.patient.loading) {
      this.props.fetchPatient();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.dateString) {
      this.setState({ error: 'Enter a date' });
    } else {
      this.props.createAppointment({
        status: STATUSES.PENDING,
        datetime: this.state.dateString,
        purpose: this.state.purpose,
        patient_id: this.props.patient.payload.id,
        doctor_id: this.state.doctor_id
      })
        .then(() => {
          this.props.history.push('/');
        });
    }
  }

  handleDateChange(dateString, dateMoment) {
    this.setState({ dateString, dateMoment });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { doctors, appointments, classes } = this.props;
    return (
      <div className="container">
        <div>
          <h2>Request an Appointment</h2>
        </div>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <div className={classes.formRow}>
            <div className={classes.dateLabel}>Date</div>
            { this.state.error && (
                <div className={classes.error}>{this.state.error}</div>
            )}
            <DateField
              dateFormat="YYYY-MM-DD hh:mm a"
              onChange={this.handleDateChange}
            />
          </div>
          <div className={classes.formRow}>
            <div>Doctor</div>
            <select name="doctor_id" onChange={this.handleChange} value={this.state.doctor_id} required>
              <option value="">Choose a doctor</option>
              {
                (doctors.payload || []).map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.firstName} {doctor.lastName}</option>
                ))
              }
            </select>
          </div>
          <div className={classes.formRow}>
            <div>Purpose</div>
            <input name="purpose" type="text" value={this.state.purpose} onChange={this.handleChange} required />
          </div>
          <Button
            variant="raised"
            color="primary"
            type="submit"
          >
            Submit Request
          </Button>
          { appointments.error && (
              <div className={classes.error}>There was a super vague problem creating the appointment.</div>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ patient, doctors, appointments }) => ({ patient, doctors, appointments });

const mapDispatchToProps = { createAppointment, fetchDoctors, fetchPatient };

NewApptRequest.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  patient: patientShape.isRequired,
  doctors: doctorsShape.isRequired,
  appointments: appointmentsShape.isRequired,
  createAppointment: PropTypes.func.isRequired,
  fetchDoctors: PropTypes.func.isRequired,
  fetchPatient: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewApptRequest));
