import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context';
import './Login.css';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthContext();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    auth.login({ username, password }, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Login Form</h3>
      <input name="username" placeholder="Username" type="text" />
      <input name="password" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}
