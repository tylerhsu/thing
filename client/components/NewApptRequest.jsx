import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateField } from 'react-date-picker';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

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
};

class NewApptRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '', // eslint-disable-line react/no-unused-state
      dateMoment: {}, // eslint-disable-line react/no-unused-state
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <div>
          <h2>Request an Appointment</h2>
        </div>
        <form className={classes.form}>
          <div className={classes.formRow}>
            <div className={classes.dateLabel}>Date</div>
            <DateField
              dateFormat="YYYY-MM-DD hh:mm a"
            />
          </div>
          <Button
            variant="raised"
            color="primary"
          >
            Submit Request
          </Button>
        </form>
      </div>
    );
  }
}


NewApptRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewApptRequest);
