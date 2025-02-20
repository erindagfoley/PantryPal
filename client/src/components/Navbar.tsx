import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import "./Navbar.css"; // ✅ Import the CSS file for styling

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">🥑 PantryPal</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search Recipes</Link></li>
        </ul>

        <div className="auth-buttons">
          {!loginCheck ? (
            <>
              <Link to='/signup' className="btn btn-signup">Sign Up</Link>
              <Link to='/login' className="btn btn-login">Login</Link>
            </>
          ) : (
            <button className="btn btn-logout" onClick={() => auth.logout()}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
