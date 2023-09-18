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