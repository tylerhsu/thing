import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Collapse } from 'react-collapse';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';

import { updateAppointment } from '../reducers/appointments';

const styles = {
  card: {
    marginBottom: 15,
    width: 400,
  },
  marginBottom: {
    marginBottom: 15,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 10,
    marginTop: 10,
  },
  action: {
    fontSize: 12,
  },
  pointer: {
    cursor: 'pointer'
  },
  inactive: {
    color: 'lightgray'
  }
};

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      message: '',
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  onMessageChange(evt) {
    this.setState({ message: evt.target.value });
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  handleDecline() {
    this.props.updateAppointment(this.props.appt.id, {
      status: STATUSES.DECLINED,
      message: this.state.message
    });
  }

  handleUndo() {
    this.props.updateAppointment(this.props.appt.id, {
      ...this.props.appt.undo
    });
  }

  handleCancel() {
    this.props.updateAppointment(this.props.appt.id, {
      status: STATUSES.CANCELED
    });
  }

  render() {
    const { appt, mayDecline, mayCancel, inactive, viewer, classes } = this.props;
    return (
      <Card key={appt.id} className={classnames(classes.card, { [classes.inactive]: inactive })}>
        <CardContent className={classnames({ [classes.pointer]: mayDecline })} onClick={mayDecline ? this.toggleDrawer : () => {}}>
          <div className={classes.content}>
            <div>
              <div className={classes.header}>{moment(appt.datetime).format('MMMM Do, YYYY')} ({moment(appt.datetime).fromNow()})</div>
              <div>
                {appt.purpose}
              </div>
              { (appt.status === STATUSES.DECLINED && viewer === ROLES.PATIENT) && (
                  <div style={{ color: 'black', marginTop: '1em' }}>This appointment has been declined. Message from the doctor: <em>"{appt.message}"</em></div>
              )}
            </div>
          </div>
        </CardContent>
        { appt.status === STATUSES.DECLINED && appt.undo &&
          <CardActions>
            <div style={{ color: 'black' }}>Appointment declined.</div>
            <Button size='small' onClick={this.handleUndo}>Undo</Button>
          </CardActions>
        }
        { appt.status === STATUSES.CANCELED && appt.undo &&
          <CardActions>
            <div style={{ color: 'black' }}>Appointment canceled.</div>
            <Button size='small' onClick={this.handleUndo}>Undo</Button>
          </CardActions>
        }
        { mayCancel &&
          <CardActions>
            <Button size='small' onClick={this.handleCancel}>Cancel {appt.status === STATUSES.PENDING ? 'appointment request' : 'appointment'}</Button>
          </CardActions>
        }
        { mayDecline &&
          <Collapse isOpened={this.state.drawerOpen}>
            <Divider />
            <CardContent>
              <div>
                <div className={classes.header}>Message to Patient</div>
                <form>
                  <div className={classes.marginBottom}>
                    <TextField
                      name="message"
                      onChange={this.onMessageChange}
                      value={this.state.message}
                      inputProps={{ style: { fontSize: 11 } }}
                      multiline
                      fullWidth
                    />
                  </div>
                  <div>
                    <Button
                      onClick={this.handleDecline}
                      variant="raised"
                      color="primary"
                      className={classes.action}
                    >
                      Decline Request
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Collapse>
        }
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  mayDecline: ownProps.appt.status === STATUSES.PENDING &&
    ownProps.viewer === ROLES.DOCTOR,
  mayCancel: (ownProps.appt.status === STATUSES.PENDING || ownProps.appt.status === STATUSES.CONFIRMED) &&
    new Date(ownProps.appt.datetime) > new Date() &&
    ownProps.viewer === ROLES.PATIENT,
  inactive: ownProps.appt.status === STATUSES.DECLINED || ownProps.appt.status === STATUSES.CANCELED
});

const mapDispatchToProps = { updateAppointment };

Appointment.propTypes = {
  appt: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    purpose: PropTypes.string,
    datetime: PropTypes.string,
  }),
  classes: PropTypes.object.isRequired,
  updateAppointment: PropTypes.func.isRequired,
  viewer: PropTypes.oneOf(_.values(ROLES)).isRequired,
  mayDecline: PropTypes.bool.isRequired,
  mayCancel: PropTypes.bool.isRequired,
  inactive: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Appointment));
