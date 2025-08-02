import { useEffect, useState, type FC } from 'react';
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

const Results: FC<Props> = ({ searchTerm }) => {
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const baseUrl = 'https://rickandmortyapi.com/api/character';
      const url = searchTerm
        ? `${baseUrl}?name=${encodeURIComponent(searchTerm)}`
        : baseUrl;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('No results found');
        }
        const json = await res.json();
        setData(json.results);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Something went wrong');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  if (isLoading) {
    return <LoadingSkeletons />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {data.map((char) => (
        <div
          key={char.id}
          className="border border-gray-300 p-4 rounded shadow w-[150px] text-center"
        >
          <img
            src={char.image}
            alt={char.name}
            width="150"
            className="w-full h-auto rounded mb-2"
          />
          <h4 className="font-semibold">{char.name}</h4>
          <p className="text-sm">Status: {char.status}</p>
          <p className="text-sm">Species: {char.species}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
