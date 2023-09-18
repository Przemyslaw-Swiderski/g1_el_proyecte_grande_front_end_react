import React, { Component } from 'react';
import {
  Checkbox,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Fade,
} from "@mui/material";
import { styled } from "@mui/system";

const buttonStyle = {
  marginTop: '10px',
  width: '100px',
  variant:"contained",
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

// const DescriptionContainer = styled(Paper)({
const DescriptionContainer = styled("div")({
  marginTop: "8px",
  padding: "1rem",
});

// const ButtonContainer = styled(Paper)({
const ButtonContainer = styled("div")({
  padding: "1rem",
});



class LoggedUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: localStorage.getItem('userEmail'), // You may need to adjust this based on your user data structure
      userName: localStorage.getItem('userName'), // You may need to adjust this based on your user data structure
      userSurname: localStorage.getItem('userSurname'), // You may need to adjust this based on your user data structure
    };
  }

render(){
  return (
      <RootContainer>
          <Grid item xs={12}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            >
            <Grid item xs={11}
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
            >
              <DescriptionContainer>
                  <Typography variant="h6">Witaj {this.state.userName} {this.state.userSurname} !</Typography>
              </DescriptionContainer>
            </Grid>
            <Grid item xs={1}
                                                  container
                                                  direction="row"
                                                  justifyContent="flex-start"
                                                  alignItems="center">
              <ButtonContainer>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={this.props.onLogout}
                      style={buttonStyle}>Logout</Button>
              </ButtonContainer>
            </Grid>
          </Grid>

                    {/* <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                      <Typography variant="h6">Welcome, {this.state.userName} {this.state.userSurname} !</Typography>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={this.props.onLogout}
                        style={buttonStyle}>Logout
                      </Button>
                    </div> */}
      </RootContainer>

  );
};
};

export default LoggedUser;