import '../style/signIn.css'
import { Link, useNavigate } from 'react-router-dom'
function LoginPage() {
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target.closest('form'))
        const data = Object.fromEntries(formData.entries())
        return data
    }

    const login = async (event) => {
        console.log('test')
        event.preventDefault()
        const data = handleSubmit(event)
        console.log(data)
        const response = await fetch('lifepod-production.up.railway.app/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        })
        console.log(response, 'response')
        if (response.status == 400) {
            setError('Sign up failed. Please check your details and try again.')
        } else if (response.status == 200) {
            navigate('/dashboard')
        }
    }
    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Login to LifePod</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder=""
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder=""
                        required
                    />

                    <button
                        type="submit"
                        className="login-submit"
                        onClick={login}
                    >
                        Login
                    </button>

                    <p className="login-info-text">
                        By logging in, you agree to our Terms of Service and
                        Privacy Policy.
                    </p>
                    <p className="signup-info-text-two">
                        <Link to="/signup">
                            Need an{' '}
                            <span className="signup-redirect-text">
                                account?
                            </span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
