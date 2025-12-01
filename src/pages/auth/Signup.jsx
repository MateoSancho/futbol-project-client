import { Link } from "react-router-dom";

function Signup() {

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Create Account</h2>
                
                <form>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                    />
                    
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
                    
                    <button type="submit">Sign Up</button>
                </form>

                <p>
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
                
                <Link to="/" className="link">← Back to Home</Link>
            </div>
        </div>
    );
}

export default Signup;