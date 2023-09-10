import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';

const containerStyle = {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const buttonStyle = {
  marginTop: '10px',
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

      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);

        // Handle successful login, e.g., redirect or update UI
        console.log('Login successful');
        this.setState({ loginResult: 'Zalogowano poprawnie 😃' });
      }
    } catch (error) {
      console.log(error);
      this.setState({ loginResult: 'Błąd logowania 😦' });
    }
  };

  render() {
    return (
      <Container maxWidth="xs" style={containerStyle}>
        <Typography variant="h4">Login Form</Typography>
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
        <br />
        {this.state.loginResult && (
          <Typography variant="body1">{this.state.loginResult}</Typography>
        )}
      </Container>
    );
  }
}

export default LoginForm;