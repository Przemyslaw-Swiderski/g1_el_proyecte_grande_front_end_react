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

  render() {
    return (
      <div className="App">
        <Container maxWidth="false" style={containerStyle}>
            <LoginStatusForm/>
        </Container>
        <Container maxWidth="false" style={containerStyle}>
        <RouterReact/>
        </Container>
      </div>
    );
  }
}

export default App;