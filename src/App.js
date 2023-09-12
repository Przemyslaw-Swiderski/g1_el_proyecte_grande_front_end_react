import React, { Component } from 'react';
import LoginForm from './RegistrationAndLogin/LoginForm';
import RegistrationForm from './RegistrationAndLogin/RegistrationForm';
import LoggedUserForm from './RegistrationAndLogin/LoggedUserForm'; // Import the LoggedUser component
import { Button, Container } from '@mui/material';
import RouterReact from './Router/RouterReact';

const containerStyle = {
  marginTop: '20px',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: !localStorage.getItem('accessToken'),
      showRegistrationForm: false,
      showLoggedUserForm: !!localStorage.getItem('accessToken')
    };
  }

  // Function to toggle between Login and Registration forms
  toggleForms = () => {
    this.setState((prevState) => ({
      showLoginForm: !prevState.showLoginForm,
      showRegistrationForm: !prevState.showRegistrationForm,
    }));
  };

    // Function to handle successful login
    handleLoginSuccess = () => {
      this.setState({
        showLoggedUserForm: true,
        showRegistrationForm: false,
        showLoginForm: false,
      });
    };

  // Function to handle logout
  handleLogout = () => {
    // Clear the access and refresh tokens and any other user-related data from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
    // localStorage.removeItem('userName'); // Remove any other user-related data as needed

    // Update the state to reflect the logout state
    this.setState({
      showLoggedUserForm: false,
      showRegistrationForm: false, // Ensure registration form is hidden
      showLoginForm: true,
    });
  };


  render() {
    return (
      <div className="App">
        <Container maxWidth="xs" style={containerStyle}>
          {this.state.showLoginForm && (
            <LoginForm
              onSwitchToRegistrationForm={this.toggleForms} // Pass callback to switch to RegistrationForm
              onLoginSuccess={this.handleLoginSuccess}
            />
          )}
          {this.state.showRegistrationForm && (
            <RegistrationForm
              onSwitchToLoginForm={this.toggleForms} // Pass callback to switch to LoginForm
            />
          )}
          {this.state.showLoggedUserForm && (
            <LoggedUserForm
              onLogout={this.handleLogout}
            />
          )}
        </Container>
        <hr/>
        <RouterReact/>
      </div>
    );
  }
}

export default App;