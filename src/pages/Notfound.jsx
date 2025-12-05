import { Link } from "react-router-dom";

function NotFound() {
    return(
        <div className="not-found-page">
            <div className="not-found-container">
                {/* Animated 404 Number */}
                <div className="error-number">
                    <span className="number">4</span>
                    <span className="number">0</span>
                    <span className="number">4</span>
                </div>

                <h1>Page Not Found</h1>
                
                <div className="error-message">
                    <p className="lead">The page you're looking for doesn't exist or has been moved.</p>
                    
                    <div className="possible-reasons">
                        <h3>This might have happened because:</h3>
                        <ul>
                            <li>🚫 The page was moved or deleted</li>
                            <li>🔗 You clicked a broken link</li>
                            <li>⌨️ You typed the wrong URL</li>
                            <li>🔄 The page is temporarily unavailable</li>
                        </ul>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="quick-links">
                    <h3>Try one of these pages:</h3>
                    <div className="link-grid">
                        <Link to="/" className="quick-link home">
                            🏠 Home
                        </Link>
                        <Link to="/players" className="quick-link players">
                            ⚽ Players
                        </Link>
                        <Link to="/positions" className="quick-link positions">
                            🎯 Positions
                        </Link>
                        <Link to="/aboutus" className="quick-link about">
                            👥 About Us
                        </Link>
                    </div>
                </div>

                {/* Funny Message */}
                <div className="fun-message">
                    <p>Meanwhile, here's a Barcelona fact:</p>
                    <blockquote>
                        "Barcelona's motto is 'Més que un club' (More than a club) - 
                        and this website is more than just 404 errors!"
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default NotFound;