import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import '../assets/css/Register.css';


const Register = () => {

    const navigate = useNavigate()

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
    };

    const handleChangePassword = (e) => {

        setPassword(e.target.value);
    };


    const handleClick = async () => {
        console.log({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        })
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password
                })
            });
            
            console.log(await response.json());
            
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="register">
            
            <div className="sign-up-form">
                <h3>Sign Up</h3>
                {/* email, firstName, lastName, password */}
                <div className="email">
                    <input 
                        onChange={handleChangeEmail} 
                        type="email" 
                        name="email" 
                        placeholder="email" 
                    />
                </div>

                <div className="firstname">
                    <input 
                        onChange={handleChangeFirstName}
                        type="text" 
                        name="firstName" 
                        placeholder="First Name" />
                </div>

                <div className="lastname">
                    <input
                        onChange={handleChangeLastName} 
                        type="text" 
                        name="lastName" 
                        placeholder="Surname Name" />
                </div>

                <div className="password">
                    <input 
                        onChange={handleChangePassword}
                        type="password" 
                        name="password" 
                        placeholder="Password"/>
                </div>

                <div className="submit-btn">
                    <button onClick={handleClick}>Sign Up</button>
                </div>

                <div className="goto-login">
                <p style={{ marginRight: '.25rem' }}>Already registered?</p>
                 <Link to={'/login'}>Login</Link>
                </div>
            </div>

        </div>
    )
};


export default Register;