import React, { useState, useContext } from 'react';
import AuthService from '../../services/AuthService';
import Header from '../../components/Header';
import Message from '../../components/Message';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/todos');
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Header text='Sign In' classes='text-center' />
        <div className='col-md-6 mx-auto'>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              onChange={handleChange}
              className='form-control'
              placeholder='email@example.com'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              onChange={handleChange}
              className='form-control'
              placeholder='Enter password'
            />
          </div>
          <button className='btn btn-lg btn-primary btn-block' type='submit'>
            Login
          </button>
          <p className='text-center'>
            Need an account? <Link to='/register'>Register</Link>
          </p>
          {message ? <Message message={message} /> : null}
        </div>
      </form>
    </div>
  );
};

export default Login;
