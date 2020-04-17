import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { AuthContext } from '../../context/AuthContext';

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const handleLogout = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavbar = () => {
    return (
      <>
        <Link to='/'>
          <li className='nav-item nav-link'>Home</li>
        </Link>
        <Link to='/login'>
          <li className='nav-item nav-link'>Login</li>
        </Link>
        <Link to='/register'>
          <li className='nav-item nav-link'>Register</li>
        </Link>
      </>
    );
  };

  const authenticatedNavbar = () => {
    return (
      <>
        <Link to='/'>
          <li className='nav-item nav-link'>Home</li>
        </Link>
        <Link to='/todos'>
          <li className='nav-item nav-link'>Todos</li>
        </Link>
        {user.role === 'admin' ? (
          <Link to='/admin'>
            <li className='nav-item nav-link'>Admin</li>
          </Link>
        ) : null}
        <button
          type='button'
          className='btn btn-link nav-item nav-link'
          onClick={handleLogout}
        >
          Logout {user.email}
        </button>
      </>
    );
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/'>
        Mern Boiler Plate
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarText'
        aria-controls='navbarText'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarText'>
        <ul className='navbar-nav ml-auto'>
          {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
