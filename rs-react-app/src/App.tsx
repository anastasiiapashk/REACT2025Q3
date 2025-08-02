import { useState, useEffect } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('search') || '';
    setSearchTerm(saved);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <ErrorBoundary>
        <Search onSearch={handleSearch} />
        <Results searchTerm={searchTerm} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
