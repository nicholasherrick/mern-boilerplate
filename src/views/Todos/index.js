import React, { useState, useContext, useEffect } from 'react';
import TodoItem from '../../components/TodoItem';
import TodoService from '../../services/TodoService';
import { AuthContext } from '../../context/AuthContext';
import Message from '../../components/Message';
import Header from '../../components/Header';

const Todos = (props) => {
  const [todo, setTodo] = useState({ name: '' });
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    TodoService.getTodos().then((data) => {
      setTodos(data.todos);
    });
  }, []);

  const resetForm = () => {
    setTodo({ name: '' });
  };

  const handleChange = (event) => {
    setTodo({ name: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    TodoService.createTodo(todo).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        TodoService.getTodos().then((getData) => {
          setTodos(getData.todos);
          setMessage(message);
        });
      } else if (message.msgBody === 'Unauthorized') {
        setMessage(message);
        authContext.setUser({ email: '', role: '' });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <div>
      <Header text='Todos:' classes='text-center' />
      <ul className='list-group'>
        {todos.map((todo) => {
          return <TodoItem key={todo._id} todo={todo} />;
        })}
      </ul>
      <br />
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='todo'>New Todo</label>
          <input
            className='form-control'
            type='text'
            name='todo'
            placeholder='Enter Todo'
            value={todo.name}
            onChange={handleChange}
          />
        </div>
        <button className='btn btn-lg btn-primary btn-block' type='submit'>
          Submit
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Todos;
