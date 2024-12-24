import '../style/indexPage.css'
import { Link } from 'react-router-dom'
import Fade from 'react-awesome-reveal'

function IndexPage() {
    return (
        <div className="app-content">
            <div className="section-one">
                <div className="section-one-content">
                    <Fade>
                        <div className="section-one-sub-header">
                            <span className="section-one-sub-header-two">
                                Accessible Emergency Care for Everyone.
                            </span>
                        </div>
                        <h1 className="section-one-header">
                            <span className="aqua">
                                Revolutionizing First Aid with Smart Technology.
                            </span>
                        </h1>
                    </Fade>
                    <div className="section-one-text">
                        Introducing a cutting-edge device designed to save
                        lives. Our smart medical box, hosted in public any public area is fit with solar-powered technologies that ensure that help is always accessible anywhere, anytime.
                        
                        Our goal is to guide anyone through the toughest or scariest moments using visual guides and step-by-step instructions by first responders. 
                        Through an easy-to-use built-in UI and transcriptions, all that is required is a press of a button and a call for help! 
                    </div>
                    <Link to="/info" className="section-one-button">
                        <div>Learn More</div>
                    </Link>
                    <div className="glow-one"></div>
                    <img
                        className="section-one-image"
                        src="/assets/front.jpg"
                        alt="Smart Medical Box"
                    />
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
                        <div className="section-two-statement-header">
                            Addressable LEDs + Alarm
                        </div>
                        <div className="section-two-statement-text">
                            The box is equipped with 8 different indicator lights for a variety of medical nessecities for our responders to quickly guide to users through the proccess of first-aid.
                            As a result, we are able to close the barrier between first-responders and people who require help through an interactive proccess.
                        </div>
                    </div>
                    <div className="section-two-statement">
                        <div className="section-two-statement-header">
                            Solar power
                        </div>
                        <div className="section-two-statement-text">
                            To ensure that the lifepod can be intergrated in all areas around cities and even the most remote areas, we have equipped our boxes with a solar panel and the batteries required to sustain day and night usage.
                        </div>
                    </div>
                    <div className="section-two-statement">
                        <div className="section-two-statement-header">
                            Cellular Data
                        </div>
                        <div className="section-two-statement-text">
                            To further boost the versatillity of locations that the box can be integrated, we use cellular data to ensure that the interface and IoT communications can be as seemless and reliable as possible while still providing the range required for any scale of operation anywhere.
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-three">
                <div className="section-three-content">
                    <div className="section-three-left">
                        <img
                            className="section-three-image"
                            src="/assets/back.jpg"
                            alt="Emergency Assistance"
                        />
                    </div>
                    <div className="section-three-right">
                        <h2 className="section-three-header">
                            Empowering Communities
                        </h2>
                        <div className="section-three-text">
                            This innovative product bridges the gap between
                            emergencies and professional medical care. It
                            empowers individuals and communities to act
                            confidently in critical moments, knowing expert help
                            is just a tap away.
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-four">
                <div className="section-four-content">
                    <Fade>
                        <h2 className="section-four-header">
                            Join the Movement
                        </h2>
                    </Fade>
                    <div className="faq-container">
                        <div className="section-four-main-text">
                            We are committed to making emergency care accessible
                            to everyone. If you’d like to support our mission or
                            learn more about implementing these boxes in your
                            community, contact us at{' '}
                            <a
                                className="aqua bold"
                                href="mailto: support@lifepod.org"
                            >
                                support@lifepod.org
                            </a>
                            . Together, we can make a difference.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndexPage
