import { Link } from "react-router-dom";

function Error () {
    return(
        <div>
            <h1>404 - Page Not Found</h1>

            <p>The page you're looking for can't be found.</p>

            <p>This might have happened because:</p>
        
            <ul>
                <li>The page was moved or deleted</li>
                <li>You typed the wrong URL</li>
                <li>The link you clicked is broken</li>
                <li>The page is temporarily unavailable</li>
            </ul>

            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
}

export default Error;