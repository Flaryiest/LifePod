import '../style/info.css'
import '../style/indexPage.css'
import { Link } from 'react-router-dom'
import Fade from 'react-awesome-reveal'

function InfoPage() {
    return (
        <div className="info-page">
            <div className="intro-section">
                <div className="intro-content">
                    <Fade>
                        <h1 className="main-header">
                            Lifepod: Revolutionizing Emergency Care
                        </h1>
                    </Fade>
                    <p className="intro-text">
                        Lifepod is a smart, solar-powered emergency care
                        solution designed to make critical first-aid accessible
                        anywhere. Equipped with easy-to-follow instructions,
                        Lifepod empowers users to handle emergencies
                        confidently, even without prior medical knowledge.
                    </p>
                    <Link to="/signup" className="button-primary">
                        Sign Up
                    </Link>
                </div>
            </div>

            <div className="features-section">
                <Fade>
                    <h2 className="section-title">Key Features</h2>
                </Fade>
                <div className="feature">
                    <h3 className="feature-title">Smart LED Indicators</h3>
                    <p className="feature-description">
                        Lifepod’s LED indicators guide you through first-aid
                        steps, showing the most relevant instructions based on
                        the emergency at hand.
                    </p>
                </div>
                <div className="feature">
                    <h3 className="feature-title">Solar-Powered</h3>
                    <p className="feature-description">
                        With built-in solar panels, Lifepod is always ready to
                        assist, even in remote locations, without relying on
                        external power sources.
                    </p>
                </div>
                <div className="feature">
                    <h3 className="feature-title">
                        Cellular Data Connectivity
                    </h3>
                    <p className="feature-description">
                        Lifepod uses cellular data to provide real-time
                        communication with first responders, ensuring a seamless
                        and reliable connection in emergencies.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InfoPage
