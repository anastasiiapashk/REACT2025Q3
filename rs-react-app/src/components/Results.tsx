import { Component } from 'react';
import LoadingSkeletons from './LoadingSkeletons';

interface Props {
  searchTerm: string;
}

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
}

interface State {
  isLoading: boolean;
  error: string | null;
  data: Character[];
}

class Results extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      data: [],
    };
  }

  componentDidMount() {
    this.fetchData(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchData(this.props.searchTerm);
    }
  }

  fetchData(term: string) {
    this.setState({ isLoading: true, error: null });

    const baseUrl = 'https://rickandmortyapi.com/api/character';
    const url = term ? `${baseUrl}?name=${encodeURIComponent(term)}` : baseUrl;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('No results found');
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ data: data.results, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, isLoading: false });
      });
  }

  render() {
    const { isLoading, error, data } = this.state;

    if (isLoading) {
      return <LoadingSkeletons />;
    }

    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {data.map((char) => (
          <div
            key={char.id}
            style={{ border: '1px solid #ccc', padding: '10px' }}
          >
            <img src={char.image} alt={char.name} width="150" />
            <h4>{char.name}</h4>
            <p>Status: {char.status}</p>
            <p>Species: {char.species}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
