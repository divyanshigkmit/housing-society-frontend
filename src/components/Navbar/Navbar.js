import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom"
import "./NavbarStyles.css"

export default function Navbar({isLogin, setLogin}) {
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if(token) {
            const checkForValidToken = async () => {
                try {
                  const response = await fetch(
                    `http://localhost:3000/api/tokenCheck`, {
                    method: "get",
                    headers: {
                      'Content-type': 'application/json',
                      'authorization': token,
                      'userId': JSON.parse(userId)
                    }
                  }
                  );
                  if (!response.ok) {
                    throw new Error(
                      `This is an HTTP error: The status is ${response.status}`
                    );
                  }
                  let responseData = await response.json();
                  if(responseData.status == 200) setLogin(true);
                } catch (err) {
                  setLogin(false);
                }
              }
              checkForValidToken()
        }
        
      }, [])
    return (
        <>
        <div className="nav">
            <div className="site-title">
                <Link to="/" className="link site-title-link">
                    Housing Society
                </Link>
            </div>
            <div className="services">
                <div>
                    <Link to="/users" className="link users-services-link">Users</Link>
                </div>
                <div>
                    <Link to="/resources" className="link resources-services-link">Resources</Link>
                </div>
                <div>
                    <Link to="/bookings" className="link bookings-services-link">Bookings</Link>
                </div>
                
            </div>
            <div>
                {!isLogin ? (<Link to="/login">
                    <button type="button" className="login-btn">Login</button>
                </Link>) : (<Link to="/login">
                    <button type="button" className="login-btn"
                        onClick={() => {
                            localStorage.clear();
                            setLogin(false);
                            return;
                        }}
                    >Logout</button>
                </Link>)
                }
                
            </div>   
        </div>
        <Outlet/>
        </>
    )
}