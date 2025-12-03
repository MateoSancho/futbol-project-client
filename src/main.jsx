import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { AuthProviderWrapper } from './context/auth.context'
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
  
root.render(
  <Router>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  </Router>
);