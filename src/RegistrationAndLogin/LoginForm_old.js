import React, { Component } from 'react';
import axios from 'axios';

class LoginForm_old extends Component {
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
        this.setState({loginResult: "Zalogowano poprawnie 😃"})
      }
    } catch (error) {

      console.log(error)

      this.setState({loginResult: "Błąd logowania 😦"})
      // this.setState({
      //   error: 'Login failed. Please check your credentials.',
      // });
    }
  };
  

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>
        <button onClick={this.handleLogin}>Login</button>
        <br/>
        {this.state.loginResult}
        {/* {this.state.error && <p>{this.state.error}</p>} */}
      </div>
    );
  }
}

export default LoginForm_old;