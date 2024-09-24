import React from 'react'
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className='nav d-flex'>
        <img 
            alt="DINERIGHT"
            src="assets/images/Logo.png"
            className='logo-img'
        />
      </div>
    </nav>
  )
}

export default Navbar
