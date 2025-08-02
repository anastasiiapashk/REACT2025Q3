import { useState, type FC, type ChangeEvent, useEffect } from 'react';

interface Props {
  onSearch: (searchTerm: string) => void;
}

const Search: FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('search')?.trim() || '';
    setInputValue(saved);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    const cleaned = inputValue.trim();
    localStorage.setItem('search', cleaned);
    onSearch(cleaned);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          data-testid="search-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <button type="submit" disabled={!inputValue.trim()}>
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
