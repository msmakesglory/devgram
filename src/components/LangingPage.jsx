import { Link } from "react-router-dom";

const LandingPage = () => {
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
        </ul>
    )
}

export default LandingPage;