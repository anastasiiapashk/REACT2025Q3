import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <div className="d-flex">
      <nav className="mb-4">
        <Link to="/" className="mr-4 text-blue-500 hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-blue-500 hover:underline">
          About
        </Link>
      </nav>
      <ThemeToggle></ThemeToggle>
    </div>
  );
};

export default Header;
