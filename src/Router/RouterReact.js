import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "../RegistrationAndLogin/LoginForm";
import RegistrationForm from "../RegistrationAndLogin/RegistrationForm";



const RouterReact = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/" element={<Homepage />} />
        </Routes>
    </Router>
)
export default RouterReact;
