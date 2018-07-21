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
  declined: {
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
  }

  onMessageChange(evt) {
    this.setState({ message: evt.target.value });
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  handleSubmit() {
    this.props.updateAppointment(this.props.appt.id, {
      status: STATUSES.DECLINED,
      message: this.state.message
    });
  }

  handleUndo() {
    this.props.updateAppointment(this.props.appt.id, {
      status: STATUSES.PENDING,
      message: ''
    });
  }

  render() {
    const { appt, classes } = this.props;
    const clickable = appt.status === STATUSES.PENDING;
    const declined = appt.status === STATUSES.DECLINED;
    return (
      <Card key={appt.id} className={classnames(classes.card, { [classes.declined]: declined })}>
        <CardContent className={classnames({ [classes.pointer]: clickable })} onClick={clickable ? this.toggleDrawer : () => {}}>
          <div className={classes.content}>
            <div>
              <div className={classes.header}>{moment(appt.datetime).format('MMMM Do, YYYY')} ({moment(appt.datetime).fromNow()})</div>
              <div>
                {appt.purpose}
              </div>
            </div>
          </div>
        </CardContent>
        { declined &&
          <CardActions>
            <div style={{ color: 'black' }}>Appointment declined.</div>
            <Button size='small' onClick={this.handleUndo}>Undo</Button>
          </CardActions>
        }
        {
          clickable ?
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
                        onClick={this.handleSubmit}
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
            </Collapse> : null
        }
      </Card>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = { updateAppointment };

Appointment.propTypes = {
  appt: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    purpose: PropTypes.string,
    datetime: PropTypes.string,
  }),
  classes: PropTypes.object.isRequired,
  updateAppointment: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Appointment));
