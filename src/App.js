import React from 'react';
import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginStatusForm from './AuthComponents/LoginStatusForm';
import LoginForm from './AuthComponents/LoginForm';
import RegistrationForm from './AuthComponents/RegistrationForm';
import { Container } from '@mui/material';


const containerStyle = {
  marginTop: '1px',
};


function App() {
  return (
    <UserProvider>
      <Router>
      <Container maxWidth="false" style={containerStyle}>
      <LoginStatusForm/>
        <Switch>
          <Route path="/login" component={<LoginForm/>} />
          <Route path="/register" component={<RegistrationForm/>} />
          <Route path="/" element={<ProductsPage />} />
          <Route path="/home" element={<ProductsPage/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Switch>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;