import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import Results from '../components/Results';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('search') || '';
    setSearchTerm(saved);
  }, []);

  return (
    <div className="p-4">
      <nav className="mb-4">
        <Link to="/" className="mr-4 text-blue-500 hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-blue-500 hover:underline">
          About
        </Link>
      </nav>
      <Search onSearch={setSearchTerm} />
      <Results searchTerm={searchTerm} />
    </div>
  );
};

export default HomePage;
