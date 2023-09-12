import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./HomePage";
import Contact from "./Contact";


function RouterReact () {
   


    return(
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </Router>
    )
}
export default RouterReact;
