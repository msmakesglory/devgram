import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Button><Link to="/">Go to Home</Link></Button>
        </div>
    );
};

export default NotFound;