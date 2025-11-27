import { Link } from "react-router-dom";

function Login() {

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                
                <form>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                    />
                    
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    
                    <button type="submit">Log In</button>
                </form>

                <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
                
                <Link to="/" className="Link">← Back to Home</Link>
            </div>
        </div>
    );
}

export default Login;