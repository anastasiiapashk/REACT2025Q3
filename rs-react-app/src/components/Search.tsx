import { Component, type ChangeEvent } from 'react';

interface Props {
  onSearch: (searchTerm: string) => void;
}

interface State {
  inputValue: string;
}

class Search extends Component<Props, State> {
  state: State = {
    inputValue: (localStorage.getItem('search') || '').trim(),
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: event.target.value });
  };

  handleSearch = (): void => {
    const cleaned: string = this.state.inputValue.trim();
    localStorage.setItem('search', cleaned);
    this.props.onSearch(cleaned);
  };

  render() {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSearch();
          }}
        >
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="Search..."
          />
          <button type="submit" disabled={!this.state.inputValue.trim()}>
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
