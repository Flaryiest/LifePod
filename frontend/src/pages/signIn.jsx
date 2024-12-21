import "../style/IndexPage.css";
import { Link } from "react-router-dom";
function LoginPage() {
  return (
    <div className="login-container">
      <h1 className="login-title">Login to LifePod</h1>
      <form className="login-form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />

        <button type="submit" className="login-submit">Login</button>

        <p className="login-info-text">
          By logging in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
}

export default LoginPage;