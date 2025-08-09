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
        className="mb-4"
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
          className="rounded-md px-3 py-2 mr-2 border border-slate-300 bg-white text-slate-900 placeholder-slate-400
                  dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
        />
        <button type="submit" disabled={!inputValue.trim()}>
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
