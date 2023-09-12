// import React from 'react';

// const LoggedUser = (props) => {
//   // Add logic here to retrieve user information, e.g., from local storage
//   const userName = 'User' //localStorage.getItem('userName'); // You may need to adjust this based on your user data structure

//   return (
//     <div>
//       <h1>Welcome, {userName}!</h1>
//       {/* Add any other content or actions you want to show for logged-in users */}
//       <button onClick={this.props.onLogout}>Logout</button>
//     </div>
//   );
// };

// export default LoggedUser;


import React, { Component } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';

const buttonStyle = {
  marginTop: '10px',
  width: '100px',
};

class LoggedUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: localStorage.getItem('userEmail'), // You may need to adjust this based on your user data structure
    };
  }

render(){
  return (
    <div>
      <h1>Welcome, {this.state.userName}!</h1>
      {/* Add any other content or actions you want to show for logged-in users */}
      <Button
          variant="contained"
          color="primary"
          onClick={this.props.onLogout}
          style={buttonStyle}
      >
          Logout
      </Button>
    </div>
  );
};
};

export default LoggedUser;