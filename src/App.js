import React, { Component } from 'react';
// import LoginForm_old from './LoginForm/LoginForm_old.js';
import LoginForm from './RegistrationAndLogin/LoginForm.js';
import RegistrationForm from './RegistrationAndLogin/RegistrationForm.js';
import { TextField, Button, Typography, Container } from '@mui/material';

const containerStyle = {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container maxWidth="xs" style={containerStyle}>
        <Typography variant="h4">React Material UI</Typography>
        <br/>
        <br/>
        </Container>
        {/* <LoginForm_old /> */}
        <RegistrationForm />
        <LoginForm />
      </div>
    );
  }
}

export default App;