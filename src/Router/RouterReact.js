import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductsPageDefault from "./ProductsPageDefault";
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
            <Route path="/" element={<ProductsPageDefault />} />
            <Route path="/home" element={<ProductsPageDefault/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/dev" element={<ProductsPageFunctionalDev/>}/>

        </Routes>
      </Router>
      </Container>
    )
}
export default RouterReact;
