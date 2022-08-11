import { Link } from 'react-router-dom';
import './Menu.css';

export function Menu() {
  return (
    <div className="Menu">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/private">Private</Link>
        </li>
      </ul>
    </div>
  );
}
