import "../style/signUp.css";
import { Link } from 'react-router-dom';

function SignUpPage() {
  return (
    <div className="signup-page">
        <div className="signup-container">
        <div className="signup-left">
            <div className="signup-left-content">
            <h1 className="signup-title">Create your account</h1>
            <p className="signup-info">
                Join LifePod to access innovative medical assistance at your fingertips. 
                Stay connected, stay safe, and empower yourself with cutting-edge technology.
            </p>
            </div>
        </div>
        <div className="signup-right">
            <div className="signup-form-container">
            <h2 className="signup-form-title">Sign up to LifePod</h2>
            <form className="signup-form">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="" required />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="" required />
                
                <p className="signup-info-text">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
                <button type="submit" className="signup-submit">Sign Up</button>
                <p className="signup-info-text-two">
                    <Link to="/login">Already have an <span className="signup-redirect-text">account?</span></Link>
                </p>
            </form>
            </div>
        </div>
        </div>
    </div>
  );
}

export default SignUpPage;