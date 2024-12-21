import "../style/IndexPage.css";
import { Link } from 'react-router-dom';
import Fade from "react-awesome-reveal";

function IndexPage() {
  return (
    <div className="app-content">
      <div className="section-one">
        <div className="section-one-content">
          <Fade>
            <div className="section-one-sub-header">
              <span className="section-one-sub-header-two">Accessible Emergency Care for Everyone.</span>
            </div>
            <h1 className="section-one-header">
              <span className="aqua">Revolutionizing First Aid with Smart Technology.</span>
            </h1>
          </Fade>
          <div className="section-one-text">
            Introducing a cutting-edge device designed to save lives. Our smart medical box, accessible to the public, connects to your phone, enabling real-time assistance in emergencies. With built-in sensors for tracking vitals and providing quick diagnoses, it empowers individuals to act swiftly in critical situations.
          </div>
          <Link to="/info" className="section-one-button">
            <div>Learn More</div>
          </Link>
          <div className="glow-one"></div>
          <img className="section-one-image" src="/assets/first-aid.jpg" alt="Smart Medical Box" />
          <div className="glow-two"></div>
          <div className="glow-three"></div>
        </div>
      </div>
      <div className="section-two">
        <div className="section-two-content">
          <Fade>
            <h2 className="section-two-header">How It Works</h2>
          </Fade>
          <div className="section-two-statement">
            <div className="section-two-statement-header">Vital Tracking</div>
            <div className="section-two-statement-text">
              The box is equipped with advanced sensors that monitor key vitals such as heart rate, oxygen levels, and temperature. It provides an immediate, AI-driven diagnosis to guide you on the next steps.
            </div>
          </div>
          <div className="section-two-statement">
            <div className="section-two-statement-header">Real-Time Support</div>
            <div className="section-two-statement-text">
              By connecting to your phone, the box creates a direct text channel with first responders. They can coach you or a helper through managing the situation, providing step-by-step instructions on wound care, CPR, or other essential actions.
            </div>
          </div>
          <div className="section-two-statement">
            <div className="section-two-statement-header">Accessible Design</div>
            <div className="section-two-statement-text">
              Designed to be user-friendly, the box is available for public use in various locations. Whether you’re at home or in a public space, you can access life-saving technology when it matters most.
            </div>
          </div>
        </div>
      </div>
      <div className="section-three">
        <div className="section-three-content">
          <div className="section-three-left">
            <img
                className="section-three-image"
                src="/assets/first-aid-rough.jpg"
                alt="Emergency Assistance"
            />
          </div>
          <div className="section-three-right">
            <h2 className="section-three-header">Empowering Communities</h2>
            <div className="section-three-text">
              This innovative product bridges the gap between emergencies and professional medical care. It empowers individuals and communities to act confidently in critical moments, knowing expert help is just a text away.
            </div>
          </div>
        </div>
      </div>
      <div className="section-four">
        <div className="section-four-content">
          <Fade>
            <h2 className="section-four-header">Join the Movement</h2>
          </Fade>
          <div className="faq-container">
            <div className="section-four-main-text">
              We are committed to making emergency care accessible to everyone. If you’d like to support our mission or learn more about implementing these boxes in your community, contact us at <a className="aqua bold" href="mailto: support@smartmedicalbox.org">support@smartmedicalbox.org</a>. Together, we can make a difference.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
