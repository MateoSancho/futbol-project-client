import { Link } from "react-router-dom";

function NotFound() {
    return(
        <div>
            <h1>404</h1>

            <p>What have you done? Why are you searching where you shouldn't?</p>

            <p>Now you are Lost. You need help, that's why i have created a button for you to go back to where you came from:</p>

            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
}

export default NotFound;