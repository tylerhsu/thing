import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';

import { shape as userShape } from '../reducers/auth';
import { shape as patientsShape, fetchPatients, searchPatients } from '../reducers/patients';

import PatientList from '../components/PatientList';

const styles = {
  welcomeMessage: {
    color: 'black',
  },
  searchWrapper: {
    padding: '5px 10px',
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 7,
  },
  search: {
    fontSize: 11,
  },
  patients: {
    marginTop: 40,
  },
  error: {
    color: 'red'
  }
};

class DoctorHome extends Component {
  constructor(props) {
    super(props);

    this.handleSearchChange = _.debounce(this.handleSearchChange.bind(this), 200);
  }

  componentWillMount() {
    if (!this.props.patients.loading && !this.props.patients.payload) {
      this.props.fetchPatients();
    }
  }

  handleSearchChange(value) {
    this.props.searchPatients(value);
  }

  render() {
    const { user, patients, filteredPatients, classes } = this.props;
    return (
      <div className="container">
        <h2 className={classes.welcomeMessage}>Welcome back, Dr. {user.payload.lastName}.</h2>
        <div className={classes.patients}>
          <div>
            <Card className={classes.searchWrapper}>
              <Icon className={classes.searchIcon}>search</Icon>
              <TextField
                name="search"
                placeholder="Search patients"
                className={classes.search}
                inputProps={{ style: { fontSize: 12 } }}
                defaultValue={patients.search}
                onChange={(evt) => this.handleSearchChange(evt.target.value)}
              />
            </Card>
            { !patients.error ?
              <PatientList patients={filteredPatients} searchTerm={patients.search} /> :
              <div className={classes.error}>There was an error retrieving patients</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({user, patients}) => ({
  user,
  patients,
  filteredPatients: Array.isArray(patients.payload) && patients.search ?
    patients.payload.filter(filterPatient(patients.search)) :
    Array.isArray(patients.payload) ? patients.payload : []
})

function filterPatient(searchTerm) {
  return (patient) => `${patient.firstName} ${patient.lastName}`.match(new RegExp(_.escapeRegExp(searchTerm), 'ig'));
}

const mapDispatchToProps = {
  fetchPatients,
  searchPatients
};

DoctorHome.propTypes = {
  user: userShape.isRequired,
  patients: patientsShape.isRequired,
  filteredPatients: PropTypes.arrayOf(PropTypes.object),
  fetchPatients: PropTypes.func.isRequired,
  searchPatients: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DoctorHome));
