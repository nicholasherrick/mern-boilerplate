import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './hocs/PrivateRoute';
import UnauthenticatedRoute from './hocs/UnauthenticatedRoute';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Todos from './views/Todos';
import Admin from './views/Admin';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='container'>
        <Route exact path='/' component={Home} />
        <UnauthenticatedRoute path='/register' component={Register} />
        <UnauthenticatedRoute path='/login' component={Login} />
        <PrivateRoute
          path='/todos'
          roles={['user', 'admin']}
          component={Todos}
        />
        <PrivateRoute path='/admin' roles={['admin']} component={Admin} />
      </div>
    </Router>
  );
}

export default App;
