import React from 'react';
import logo from '../Images/logo.png'
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" >
        <div className="container-fluid nav-border">
          <h6 className="navbar-brand" href="/">Shopy-Fi</h6>
          <img src={logo} alt='logo' className='nav_pic'/>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink className="nav-link" to="/Add-Product">Add Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/About">About Site</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Log-in">Log-in</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Orders">Your Orders</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
