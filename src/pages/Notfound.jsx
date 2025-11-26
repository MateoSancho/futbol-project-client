import { Link } from "react-router-dom";

function NotFound() {
    return(
        <div>
            <h1>Page for 500 errors</h1>

            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
}

export default NotFound;