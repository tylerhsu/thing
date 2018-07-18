import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

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
  }

  onMessageChange(evt) {
    this.setState({ message: evt.target.value });
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  render() {
    const { appt, classes } = this.props;
    return (
      <Card key={appt.datetime} className={classes.card} onClick={appt.status === 'pending' ? this.toggleDrawer : () => {}}>
        <CardContent>
          <div className={classes.content}>
            <div>
              <div className={classes.header}>{appt.datetime}</div>
              <div>
                {appt.purpose}
              </div>
            </div>
          </div>
        </CardContent>
        {
          appt.status === 'pending' ?
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

Appointment.propTypes = {
  appt: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    purpose: PropTypes.string,
    datetime: PropTypes.string,
  }),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Appointment);
