import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/navbar.css'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev)
    }

    return (
        <div className="navbar-container">
            <header className="header">
                <Link to="/" className="logo">
                    <img
                        className="nav-logo"
                        src="/assets/lifepod-logo.webp"
                    ></img>
                </Link>
                <nav className="nav">
                    <ul className="nav-links">
                        <Link to="/info" className="nav-link">
                            <li>Info</li>
                        </Link>
                        <Link to="/login" className="nav-link">
                            <li>Sign In</li>
                        </Link>
                        <Link to="/signup" className="nav-link sign-up-button">
                            <li>Sign Up</li>
                        </Link>
                        <button className="menu" onClick={toggleMenu}>
                            <img src="assets/menu.svg" alt="Menu" />
                        </button>
                    </ul>
                </nav>
            </header>
            {menuOpen && (
                <div className="fullscreen-menu">
                    <ul className="fullscreen-links">
                        <li>
                            <Link to="/" onClick={toggleMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" onClick={toggleMenu}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/info" onClick={toggleMenu}>
                                Info
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}
