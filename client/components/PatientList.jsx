import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

const styles = {
  container: {
    marginTop: 30,
    padding: '5px 20px 5px 20px',
  },
  patientRow: {
    cursor: 'pointer',
  },
  patientInfo: {
    fontSize: 14,
    height: 50,
    display: 'flex',
    alignItems: 'center',
  },
};

const PatientList = ({ patients, history, classes }) => (
  <Paper className={classes.container}>
    <h3>Patients</h3>
    {
      patients.map((patient) => (
        <div
          key={patient.id}
          onClick={() => {
            history.push(`/patient/${patient.id}`);
          }}
          onKeyPress={() => {
            history.push(`/patient/${patient.id}`);
          }}
          className={classes.patientRow}
        >
          <Divider />
          <div className={classes.patientInfo}>
            {patient.name}
          </div>
        </div>))
    }
  </Paper>
);

PatientList.propTypes = {
  patients: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PatientList));
