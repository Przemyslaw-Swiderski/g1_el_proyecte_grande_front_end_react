import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';

const containerStyle = {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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

// const buttonStyle = {
//   marginTop: '10px',
// };

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      registrationResult: '',
      error: null,
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRegistration = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8081/api/v1/register',
        {
          email: this.state.email,
          password: this.state.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );



    console.log('Registration successful');
    this.setState({ registrationResult: 'Registration successful 😃' });

    //   console.log(response.data)
    //   if (response.data.success) {
    //     this.setState({ registrationResult: 'Registration successful 😃' });
    //   } else {
    //     this.setState({ registrationResult: 'Registration failed. Please try again.' });
    //   }
    } catch (error) {
      console.log(error);
      this.setState({ registrationResult: 'Registration failed 😦' });
    }
  };

  render() {
    return (
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
        <TextField
          size="small"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={this.state.confirmPassword}
          onChange={this.handleInputChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={this.handleRegistration}
          style={buttonStyle}
        >
          Register
        </Button>
        </form>
        <br />
        {this.state.registrationResult && (
          <Typography variant="body1">{this.state.registrationResult}</Typography>
        )}

        {/* Button to switch to the login form */}
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={this.props.onSwitchToLoginForm}
          style={buttonStyle}
        >To Login
        </Button>
      </Container>
    );
  }
}

export default RegistrationForm;