import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductsPage from "./ProductsPage";
import Contact from "./Contact";


function RouterReact () {
   


    return(
      <Router>
        <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/home" element={<ProductsPage/>}/>
            <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </Router>
    )
}
export default RouterReact;
