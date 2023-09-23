import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductsListingPage from "./ProductsListingPage.js";
import ProductsPageFunctionalDev from "./ProductsPageFunctionalDev.js";
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
            <Route path="/" element={<ProductsListingPage />} />
            <Route path="/home" element={<ProductsListingPage/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/dev" element={<ProductsPageFunctionalDev/>}/>

        </Routes>
      </Router>
      </Container>
    )
}
export default RouterReact;
