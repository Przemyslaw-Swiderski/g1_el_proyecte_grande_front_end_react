import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductsPage from "./ProductsPage";
import Contact from "./Contact";
import LoginForm from "../RegistrationAndLogin/LoginForm";
import RegistrationForm from "../RegistrationAndLogin/RegistrationForm";
import { Container } from '@mui/material';

const containerStyle = {
  marginTop: '1px',
};

function RouterReact () {
   


    return(
      <Container maxWidth="false" style={containerStyle}>
      <Router>
        <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/home" element={<ProductsPage/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/register" element={<RegistrationForm/>}/>
        </Routes>
      </Router>
      </Container>
    )
}
export default RouterReact;
