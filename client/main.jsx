import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={DoctorHome} />
            <Route path="/patient/:id" component={Patient} />
            <Route path="/account" component={PatientHome} />
            <Route path="/request-appointment" component={NewApptRequest} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('main') // eslint-disable-line
);
