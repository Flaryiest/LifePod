import "../style/signIn.css";
import { Link } from "react-router-dom";
function LoginPage() {
  return (
    <div className="login-page">
        <div className="login-container">
        <h1 className="login-title">Login to LifePod</h1>
        <form className="login-form">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="" required />

            <button type="submit" className="login-submit">Login</button>

            <p className="login-info-text">
            By logging in, you agree to our Terms of Service and Privacy Policy.
            </p>
            <p className="signup-info-text-two">
                    <Link to="/signup">Need an <span className="signup-redirect-text">account?</span></Link>
                </p>
        </form>
        </div>
    </div>
  );
}

export default LoginPage;