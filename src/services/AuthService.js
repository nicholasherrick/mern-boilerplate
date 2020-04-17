export default {
  register: (user) => {
    return fetch('/auth/register', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { email: '', role: '' } };
    });
  },
  login: (user) => {
    return fetch('/auth/login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { email: '', role: '' } };
    });
  },
  logout: () => {
    return fetch('/auth/logout')
      .then((res) => res.json())
      .then((data) => data);
  },
  // Sync back-end and front-end so session persists even if window closes
  isAuthenticated: () => {
    return fetch('/auth/authenticated').then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { email: '', role: '' } };
    });
  },
};
