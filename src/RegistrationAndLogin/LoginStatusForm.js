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

const RootContainer = styled("div")({
  marginTop: "2rem",
});

const DescriptionContainer = styled("div")({
  padding: "1rem",
});

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
        {/* <Container>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            >
            <DescriptionContainer>
                <Grid item xs={11}>

                <Typography variant="h6">Welcome, {this.state.userName} !</Typography>

                </Grid>
            </DescriptionContainer>
            <ButtonContainer>
                <Grid item xs={1}>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={this.props.onLogout}
                      style={buttonStyle}>Logout</Button>
                </Grid>
            </ButtonContainer>
          </Grid>
        </Container> */}
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                      <Typography variant="h6">Welcome, {this.state.userName} {this.state.userSurname} !</Typography>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={this.props.onLogout}
                        style={buttonStyle}>Logout
                      </Button>
                    </div>
      </RootContainer>

  );
};
};

export default LoggedUser;