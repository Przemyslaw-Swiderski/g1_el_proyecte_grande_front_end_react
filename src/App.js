import React, { Component } from 'react';
import LoginForm from './RegistrationAndLogin/LoginForm';
import RegistrationForm from './RegistrationAndLogin/RegistrationForm';
import { Button, Container } from '@mui/material';
import RouterReact from './Router/RouterReact';

const containerStyle = {
  marginTop: '20px',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: (localStorage.getItem('accessToken') === null && localStorage.getItem('refreshToken') === null),
      showRegistrationForm: false,
    };
  }

  // Function to toggle between Login and Registration forms
  toggleForms = () => {
    this.setState((prevState) => ({
      showLoginForm: !prevState.showLoginForm,
      showRegistrationForm: !prevState.showRegistrationForm,
    }));
  };

  render() {
    return (
      <div className="App">
        <Container maxWidth="xs" style={containerStyle}>
          {/* <h1>React Material UI</h1> */}
          {this.state.showLoginForm && <LoginForm />}
          {this.state.showRegistrationForm && <RegistrationForm />}
          <Button
            variant="contained"
            color="primary"
            onClick={this.toggleForms}
          >
            {this.state.showLoginForm ? 'Register' : 'Back to Login'}
          </Button>
        </Container>
        <RouterReact />
      </div>
    );
  }
}

export default App;


