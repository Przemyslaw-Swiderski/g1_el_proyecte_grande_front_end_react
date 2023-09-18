import React, { Component } from 'react';
import LoginForm from './RegistrationAndLogin/LoginForm';
import RegistrationForm from './RegistrationAndLogin/RegistrationForm';
import LoginStatusForm from './RegistrationAndLogin/LoginStatusForm'; // Import the LoggedUser component
import { Container } from '@mui/material';
import RouterReact from './Router/RouterReact';

const containerStyle = {
  marginTop: '1px',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: !localStorage.getItem('accessToken'),
      showRegistrationForm: false,
      showLoginStatusForm: !!localStorage.getItem('accessToken')
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
        showLoginStatusForm: true,
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
    localStorage.removeItem('userName');
    localStorage.removeItem('userSurname');
    // localStorage.removeItem('userName'); // Remove any other user-related data as needed

    // Update the state to reflect the logout state
    this.setState({
      showLoginStatusForm: false,
      showRegistrationForm: false, // Ensure registration form is hidden
      showLoginForm: true,
    });
  };


  render() {
    return (
      <div className="App">
        <Container maxWidth="false" style={containerStyle}>
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
          {this.state.showLoginStatusForm && (
            <LoginStatusForm
              onLogout={this.handleLogout}
            />
          )}

        <hr/>
        </Container>
        <Container maxWidth="false" style={containerStyle}>
        <RouterReact/>
        </Container>
      </div>
    );
  }
}

export default App;