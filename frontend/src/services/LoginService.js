const LoginService = {
  login: (email, password) => {
    const options = {
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };

    return fetch('http://127.0.0.1:8080/api/v1/login', options)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  },

  logout: (email) => {
    const options = {
      body: JSON.stringify({ email }),
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

const RegisterService = {
  login: (userName, password,passwordConfirm,email, userType) => {
    const options = {
      body: JSON.stringify({ userName, password,passwordConfirm,email, userType }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };

    return fetch('http://127.0.0.1:8080/api/v1/register', options)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  },

  
   
  
};

export { LoginService, RegisterService };
