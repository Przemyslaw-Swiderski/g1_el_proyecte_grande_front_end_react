import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductsPage from "./ProductsPage";
import Contact from "./Contact";
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
        </Routes>
      </Router>
      </Container>
    )
}
export default RouterReact;
