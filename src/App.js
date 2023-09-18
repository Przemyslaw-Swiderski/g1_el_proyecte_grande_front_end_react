import React, { Component } from 'react';
import LoginForm from './RegistrationAndLogin/LoginCompactForm';
import RegistrationForm from './RegistrationAndLogin/RegistrationCompactForm';
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
      showLoginCompactForm: !localStorage.getItem('accessToken'),
      showRegistrationCompactForm: false,
      showLoginStatusForm: !!localStorage.getItem('accessToken')
    };
  }

  // Function to toggle between Login and Registration forms
  toggleForms = () => {
    this.setState((prevState) => ({
      showLoginCompactForm: !prevState.showLoginCompactForm,
      showRegistrationCompactForm: !prevState.showRegistrationCompactForm,
    }));
  };

    // Function to handle successful login
    handleLoginSuccess = () => {
      this.setState({
        showLoginStatusForm: true,
        showRegistrationCompactForm: false,
        showLoginCompactForm: false,
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
      showRegistrationCompactForm: false, // Ensure registration form is hidden
      showLoginCompactForm: true,
    });
  };


  render() {
    return (
      <div className="App">
        <Container maxWidth="false" style={containerStyle}>
          {this.state.showLoginCompactForm && (
            <LoginForm
              onSwitchToRegistrationForm={this.toggleForms} // Pass callback to switch to RegistrationForm
              onLoginSuccess={this.handleLoginSuccess}
            />
          )}
          {this.state.showRegistrationCompactForm && (
            <RegistrationForm
              onSwitchToLoginForm={this.toggleForms} // Pass callback to switch to LoginForm
            />
          )}
          {this.state.showLoginStatusForm && (
            <LoginStatusForm
              onLogout={this.handleLogout}
            />
          )}


        </Container>
        <Container maxWidth="false" style={containerStyle}>
        <RouterReact/>
        </Container>
      </div>
    );
  }
}

export default App;