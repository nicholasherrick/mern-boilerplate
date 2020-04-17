export default {
  getTodos: () => {
    return fetch('/todo/all').then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: 'Unauthorized' }, msgError: true };
    });
  },
  createTodo: (todo) => {
    return fetch('/todo/create', {
      method: 'post',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: 'Unauthorized' }, msgError: true };
    });
  },
};
