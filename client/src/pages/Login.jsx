import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import '../assets/css/Login.css';


const Login = () => {
    
    const navigate = useNavigate();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");


    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleClickSignIn = async () => {

        try {
            const login = await fetch('/api/auth/login', {
                method: "POST",
    
                headers: {
                    "Content-Type": "application/json"
                },
    
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const response = await login.json()

            localStorage.setItem("authToken", response.signedToken);

            navigate('/');  // navigate to the home page
        } catch (error) {
            console.log(error);
        }
    };

    // Redirect user to home page if already signed in
    useEffect(() => {
        if(localStorage.getItem("authToken")) {
            navigate('/')
        }

    }, [])

    return (
        <div className="login">
            <div className="login-in-form">
                <h3>Sign In</h3>

                <div className="email">
                    <input 
                        onChange={ handleChangeEmail } 
                        type="text" 
                        name="email" 
                        placeholder="Email"
                    />
                </div>

                <div className="password">
                    <input 
                        onChange={ handleChangePassword } 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                    />
                </div>

                <div className="submit-btn">
                    <button onClick={ handleClickSignIn } >Sign In</button>
                </div>

                <div className="goto-register">
                    <p style={{ marginRight: '.25rem' }}>Not registered?</p>
                    <Link to={ '/register' }>Register</Link>
                </div>
            </div>
        </div>
    )
};

export default Login;