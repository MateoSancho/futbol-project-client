import { Link } from "react-router-dom";

function Error () {
    return(
        <div>
            <h1>Error Page</h1>

            <p>This might have happened because:</p>
        
            <ul>
                <li>There has ...</li>
            </ul>

            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
}

export default Error;