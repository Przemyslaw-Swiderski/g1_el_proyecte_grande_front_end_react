import React, { Component } from 'react';
import axios from 'axios';
import {
  TextField,
  Checkbox,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Fade,
} from "@mui/material";
import { styled } from "@mui/system";

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

const RootContainer = styled(Paper)({
  marginTop: "2rem",
  marginBottom: "2rem",
  padding: "1rem",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
});

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
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('userSurname', response.data.userSurname);
        
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
      <RootContainer>
      <Container maxWidth="xs" style={containerStyle}>
        <Typography variant="h4"></Typography>
        <form style={formStyle}>
        <TextField
            size="small"
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
            size="small"
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
            size="small"
            variant="contained"
            color="primary"
            onClick={this.handleLogin}
            style={buttonStyle}
          >
            ZALOGUJ
          </Button>
        </form>
        <br />
        {this.state.loginResult && (
          <Typography variant="body1">{this.state.loginResult}</Typography>
        )}

        {/* Button to switch to the registration form */}
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={this.props.onSwitchToRegistrationForm}
          style={buttonStyle}
        >
          REJESTRACJA
        </Button>

      </Container>
      </RootContainer>
    );
  }
}

export default LoginForm;
