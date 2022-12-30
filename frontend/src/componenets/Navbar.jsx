import React from 'react'
import "./Navbar.css"
import logo from "../img/logoinsta2.png"
// import logo from "../img/logoinsta2.svg"
import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <div className='navbar'>
            {/* <img src={logo} alt="logo" /> */}
            <div className="nav-img">
                <Link to="/" className='linkHome' >
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <ul className='nav-menu'>
                <Link to="/createPost">
                    <li>
                        <span className="material-symbols-sharp">
                            add_box
                        </span>
                    </li>
                </Link>
                <Link to="/signup"><li>SignUp</li></Link>
                <Link to="/signin"><li>SignIn</li></Link>
                <Link to="/profile"><li>Profile</li></Link>
            </ul>

        </div>
    )
}