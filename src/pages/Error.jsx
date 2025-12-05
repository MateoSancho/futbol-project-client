import { Link, useLocation, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

function Error () {
    const location = useLocation();
    const navigate = useNavigate();
    const [errorCode, setErrorCode] = useState("500");
    const [errorMessage, setErrorMessage] = useState("Something went wrong");
    
    // Get error details from location state
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code") || "500";
        const message = searchParams.get("message") || "Something went wrong on our end";
        
        setErrorCode(code);
        setErrorMessage(message);
        
        // Log the error for debugging
        console.error(`Error ${code}: ${message}`, {
            path: location.pathname,
            search: location.search,
            timestamp: new Date().toISOString()
        });
    }, [location]);

    // Reload page
    const handleReload = () => {
        window.location.reload();
    };

    // Go back
    const handleGoBack = () => {
        navigate(-1);
    };

    // Common errors and their solutions
    const errorSolutions = {
        "500": [
            "Our server is having issues. Try again in a few moments.",
            "Check your internet connection.",
            "Clear your browser cache and cookies."
        ],
        "401": [
            "You need to log in to access this page.",
            "Your session might have expired. Try logging in again.",
            "Check if you have the correct permissions."
        ],
        "403": [
            "You don't have permission to access this resource.",
            "Contact an administrator for access.",
            "Make sure you're logged in with the right account."
        ],
        "404": [
            "The page you're looking for doesn't exist.",
            "Check the URL for typos.",
            "Use the navigation menu to find what you need."
        ],
        "network": [
            "Check your internet connection.",
            "The server might be down. Try again later.",
            "Disable any VPN or proxy that might be interfering."
        ]
    };

    const getSolutions = () => {
        if (errorCode === "500") return errorSolutions["500"];
        if (errorCode === "401") return errorSolutions["401"];
        if (errorCode === "403") return errorSolutions["403"];
        if (errorCode === "404") return errorSolutions["404"];
        if (errorMessage.toLowerCase().includes("network")) return errorSolutions["network"];
        return errorSolutions["500"];
    };


    return(
        <div className="error-page">
            <div className="error-container">
                {/* Error Header */}
                <div className="error-header">
                    <div className="error-icon">⚠️</div>
                    <h1>Oops! Error {errorCode}</h1>
                    <p className="error-description">{errorMessage}</p>
                </div>

                {/* Error Details */}
                <div className="error-details">
                    <div className="details-card">
                        <h3>📋 Error Details</h3>
                        <ul>
                            <li><strong>Code:</strong> {errorCode}</li>
                            <li><strong>Message:</strong> {errorMessage}</li>
                            <li><strong>Path:</strong> {location.pathname}</li>
                            <li><strong>Time:</strong> {new Date().toLocaleTimeString()}</li>
                        </ul>
                    </div>

                    <div className="solutions-card">
                        <h3>🔧 Possible Solutions</h3>
                        <ol>
                            {getSolutions().map((solution, index) => (
                                <li key={index}>{solution}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button onClick={handleReload} className="action-btn reload">
                        🔄 Reload Page
                    </button>
                    <button onClick={handleGoBack} className="action-btn back">
                        ↩️ Go Back
                    </button>
                    <Link to="/" className="action-btn home">
                        🏠 Go Home
                    </Link>
                    <a 
                        href={`mailto:mateo@gmail.com?subject=Error ${errorCode} on Barca Pedia&body=I encountered error ${errorCode} at ${location.pathname} with message: ${errorMessage}`}
                        className="action-btn report"
                    >
                        📧 Report Error
                    </a>
                </div>

                {/* Technical Info (Collapsible) */}
                <details className="technical-info">
                    <summary>🛠️ Technical Information (for developers)</summary>
                    <div className="tech-details">
                        <pre>
{`Error Code: ${errorCode}
Error Message: ${errorMessage}
Path: ${location.pathname}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}
`}
                        </pre>
                        <button 
                            onClick={() => {
                                const text = document.querySelector('.tech-details pre').innerText;
                                navigator.clipboard.writeText(text);
                                alert('Error details copied to clipboard!');
                            }}
                            className="copy-btn"
                        >
                            📋 Copy Error Details
                        </button>
                    </div>
                </details>

                {/* Status Monitor */}
                <div className="status-monitor">
                    <h3>🌐 Service Status</h3>
                    <div className="status-grid">
                        <div className="status-item online">
                            <div className="status-dot"></div>
                            <span>Frontend: Operational</span>
                        </div>
                        <div className="status-item">
                            <div className="status-dot checking"></div>
                            <span>Backend: Checking...</span>
                        </div>
                        <div className="status-item online">
                            <div className="status-dot"></div>
                            <span>Database: Operational</span>
                        </div>
                        <div className="status-item online">
                            <div className="status-dot"></div>
                            <span>Cloudinary: Operational</span>
                        </div>
                    </div>
                </div>

                {/* Funny Error Message */}
                <div className="fun-error">
                    <p>Don't worry, even the best teams have bad days!</p>
                    <div className="quote">
                        "Even Messi misses penalties sometimes. This error is our penalty miss!"
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error;