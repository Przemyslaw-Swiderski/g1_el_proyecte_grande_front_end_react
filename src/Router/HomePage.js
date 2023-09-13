import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const HomePage = () => (


<div>
<Link to={`/contact`}>Contact</Link>
<h1>HomePage</h1>
<h2>Tu będzie treść naszej strony startowej</h2>


</div>



)

export default HomePage;
