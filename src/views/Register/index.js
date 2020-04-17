import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import Message from '../../components/Message';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

const Register = (props) => {
  const [user, setUser] = useState({ email: '', password: '', role: '' });
  const [message, setMessage] = useState(null);
  let timerId = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const resetForm = () => {
    setUser({ email: '', password: '', role: '' });
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerId = setTimeout(() => {
          props.history.push('/login');
        }, 2000);
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Header text='Register' classes='text-center' />
        <div className='col-md-6 mx-auto'>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              value={user.email}
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
              value={user.password}
              onChange={handleChange}
              className='form-control'
              placeholder='Enter password'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='role'>Role</label>
            <select
              className='form-control'
              name='role'
              value={user.role}
              onChange={handleChange}
            >
              <option defaultValue>Choose...</option>
              <option>user</option>
              <option>admin</option>
            </select>
          </div>
          <button className='btn btn-lg btn-primary btn-block' type='submit'>
            Register
          </button>
          <p className='text-center'>
            Have an account? <Link to='/login'>Login</Link>
          </p>
          {message ? <Message message={message} /> : null}
        </div>
      </form>
    </div>
  );
};

export default Register;
