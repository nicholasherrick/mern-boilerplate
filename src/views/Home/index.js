import React from 'react';
import Header from '../../components/Header';

export default function Home() {
  return (
    <div className='text-center jumbotron'>
      <Header text='Welcome to the MERN Boiler Plate' classes='text-center' />
      <p>
        Repository:{' '}
        <a href='https://github.com/nicholasherrick/mern-boilerplate'>
          https://github.com/nicholasherrick/mern-boilerplate
        </a>
      </p>
      <p>
        This application uses passport and json web tokens for authentication
      </p>
    </div>
  );
}
