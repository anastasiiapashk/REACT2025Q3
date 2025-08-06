import { type FC, type ChangeEvent } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface Props {
  onSearch: (searchTerm: string) => void;
}

const Search: FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useLocalStorage('search', '');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    const cleaned = inputValue.trim();
    setInputValue(cleaned);
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
