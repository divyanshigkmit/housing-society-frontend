import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

import "./loginPageStyles.css"

export default function LoginPage({setLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    const loginPress = async (e) => {
        e.preventDefault();
        setLogin(true);
        try {
            let result = await fetch('http://localhost:3000/api/users/login', {
                method: 'post',
                body: JSON.stringify({ email_id: email, pwd: password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let results = await result.json();
            localStorage.setItem('token', results.token);
            localStorage.setItem('userId', JSON.stringify(results.userId));

            if(result.status == 200) {
                setLogin(true);
                navigate('/');
            }
            
            
        } catch (error) {
            console.log("Incorrect email or password");
        }

    }

    return (
        <div>
            <div className="login-container">
                <form action="" onSubmit={loginPress}>
                    <h1>Login</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" required autoComplete="off" autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" required autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <input type="submit" className="login-page-btn" value="Login" />
                </form>
            </div>
        </div>
    )
}