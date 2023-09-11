import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./HomePage";


function RouterReact () {
   


    return(
      <Router>
        <Routes>
            <Route path="/home" element={<HomePage/>}/>
        </Routes>
      </Router>
    )
}
export default RouterReact;
