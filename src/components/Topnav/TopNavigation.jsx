import React from 'react';
import './TopNavigation.css'
import { Link, useLocation } from 'react-router-dom';

function TopNav() {
  const location = useLocation();

  return (
    <>
      <nav className="topNavigationContainer">
        <div className="topNavigationLogo">
          <img src="/src/assets/logo-kasa.png"></img>
        </div>
        <div className="topNavigationMenu">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Accueil</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>A propos</Link>
        </div>
      </nav>
    </>
  )
}

export default TopNav