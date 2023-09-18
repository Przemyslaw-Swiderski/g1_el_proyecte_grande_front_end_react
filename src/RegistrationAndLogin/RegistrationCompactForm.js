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
        >ZAREJESTRUJ
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
        >LOGOWANIE
        </Button>
      </Container>
      </RootContainer>
    );
  }
}

export default RegistrationForm;