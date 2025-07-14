import { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorButton from './components/ErrorButton';
import ErrorBoundary from './ErrorBoundary';

interface State {
  searchTerm: string;
}

class App extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    const saved = localStorage.getItem('search') || '';
    this.state = {
      searchTerm: saved,
    };
  }

  handleSearch = (term: string) => {
    this.setState({ searchTerm: term });
  };

  render() {
    return (
      <div>
        <ErrorBoundary>
          <Search onSearch={this.handleSearch} />
          <Results searchTerm={this.state.searchTerm} />
          <ErrorButton />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
