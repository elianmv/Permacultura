const LoginService = {
  login: (username, password) => {
    const options = {
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };

    return fetch('/login', options)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  },

  logout: (username) => {
    const options = {
      body: JSON.stringify({ username }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };

    return fetch('/logout', options)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  },
};

export { LoginService };
