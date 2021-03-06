import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './containers/PrivateRoute';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import pink from 'material-ui/colors/pink';
import blue from 'material-ui/colors/blue';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Hind, sans-serif',
  },
  palette: {
    primary: pink,
    secondary: blue,
  },
});

import store from './store';

import Login from './containers/Login';
import DoctorHome from './containers/DoctorHome';
import PatientHome from './containers/PatientHome';
import Patient from './containers/DoctorPatient';
import FetchMe from './containers/FetchMe';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NewApptRequest from './components/NewApptRequest';

// Load Global CSS
import '../assets/stylesheets/style.scss';

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <FetchMe />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={DoctorHome} requiredRole="doctor" />
            <PrivateRoute path="/patient/:id" component={Patient} requiredRole="doctor" />
            <PrivateRoute path="/account" component={PatientHome} requiredRole="patient" />
            <PrivateRoute path="/request-appointment" component={NewApptRequest} requiredRole="patient" />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('main') // eslint-disable-line
);
