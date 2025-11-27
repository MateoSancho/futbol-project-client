import { Link } from "react-router-dom";

function Error () {
    return(
        <div>
            <h1>Error page</h1>

            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
}

export default Error;