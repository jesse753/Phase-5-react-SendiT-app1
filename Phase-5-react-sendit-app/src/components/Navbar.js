import { NavLink, useNavigate } from "react-router-dom";
import "../styles/nav.css";


function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/");
  }

  return (
 
      <nav className="navigation">
        <NavLink to="/" className="brand-name">
                <h3>
                    Send<span>IT</span>
                </h3>
             </NavLink>
      
          <div className="navigation-menu">
          
            <ul className="navbar-nav">
              <li className="nav-item">
              {user ? <p className="currentUser">Hi, {user.name}</p> : null}
                </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/service">
                  Service
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ContactUs">
                Contact Us
                </NavLink>
              </li>
             
              <li className="nav-item">
                {!user ? (
                  <NavLink className="nav-link" to="/login">
                    Login / Register
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" to="/logout" onClick={handleLogout}>
                    Logout
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
      </nav>
  );
}
export default Navbar;


// import React from "react";
// import "../styles/nav.css";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//     return (
//         <nav className="navigation">
//             <Link to="/" className="brand-name">
//                 <h3>
//                     Send<span>Y</span>
//                 </h3>
//             </Link>

//             <div className="navigation-menu">
//                 <ul>
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/Service">Services</Link>
//                     </li>
//                     <li>
//                         <Link to="/about">About</Link>
//                     </li>
//                     <li>
//                         <Link to="/ContactUs">Contact Us</Link>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
