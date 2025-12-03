import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
                { email, password }
            );

            // Save the token
            storeToken(response.data.authToken);

            // ⭐ Fetch role through /verify
            const verifyResponse = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/verify`,
                {
                    headers: { Authorization: `Bearer ${response.data.authToken}` }
                }
            );

            // ⭐ Save role in localStorage
            localStorage.setItem("role", verifyResponse.data.role);

            // Update context state
            authenticateUser();
            
            // Redirect
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button type="submit">Log In</button>
                </form>

                <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
                
                <Link to="/" className="link">← Back to Home</Link>
            </div>
        </div>
    );
}

export default Login;
