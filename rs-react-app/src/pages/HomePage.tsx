import { useEffect, useState } from 'react';
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
      <Search onSearch={setSearchTerm} />
      <Results searchTerm={searchTerm} />
    </div>
  );
};

export default HomePage;
