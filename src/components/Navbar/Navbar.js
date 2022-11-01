import { Link, Outlet } from "react-router-dom"
import "./styles.css"

export default function Navbar() {
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
                <Link to="/login">
                    <button type="button" className="login-btn">Login</button>
                </Link>
            </div>   
        </div>
        <Outlet/>
        </>
    )
}