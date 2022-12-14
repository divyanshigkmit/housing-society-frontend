import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom"
import "./NavbarStyles.css"

export default function Navbar({isLogin, setLogin}) {
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if(token) {
            setLogin(true);
        }else {
            setLogin(false);
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