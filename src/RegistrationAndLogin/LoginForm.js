import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';

const containerStyle = {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '500px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '500px',
};

const buttonStyle = {
  marginTop: '10px',
  width: '100px',
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginResult: '',
      error: null,
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8081/api/v1/login',
        {
          username: this.state.email,
          password: this.state.password,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Specify Content-Type header
          },
        }
      );

      if (response.data.accessToken && response.data.refreshToken) {
        // Store the token in localStorage
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userEmail', response.data.userEmail);
        
        // Handle successful login, e.g., redirect or update UI
        console.log('Login successful');
        this.setState({ loginResult: 'Zalogowano poprawnie 😃' });

        this.props.onLoginSuccess();

      }
    } catch (error) {
      console.log(error);
      this.setState({ loginResult: 'Błąd logowania 😦' });
    }
  };

  render() {
    return (
      <Container maxWidth="xs" style={containerStyle}>
        <Typography variant="h4"></Typography>
        <form style={formStyle}>
        <TextField
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleLogin}
            style={buttonStyle}
          >
            Login
          </Button>
        </form>
        <br />
        {this.state.loginResult && (
          <Typography variant="body1">{this.state.loginResult}</Typography>
        )}

        {/* Button to switch to the registration form */}
        <Button
          variant="contained"
          color="primary"
          onClick={this.props.onSwitchToRegistrationForm}
          style={buttonStyle}
        >
          Register
        </Button>

      </Container>
    );
  }
}

export default LoginForm;
