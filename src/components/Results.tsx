import { useEffect, useState, type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelectedItemsStore } from '../store/selectedItemsStore';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const toggleItem = useSelectedItemsStore((state) => state.toggleItem);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const baseUrl = 'https://rickandmortyapi.com/api/character';
      const url = searchTerm
        ? `${baseUrl}?name=${encodeURIComponent(searchTerm)}&page=${page}`
        : `${baseUrl}?page=${page}`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('No results found');
        const json = await res.json();
        setData(json.results);
      } catch (err) {
        setError((err as Error).message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, page]);

  useEffect(() => {
    setSearchParams({ page: '1' });
  }, [searchTerm]);

  if (isLoading) return <LoadingSkeletons />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className={`${selectedItems.length > 0 ? 'pb-20' : ''}`}>
      <div className="flex flex-wrap gap-4">
        {data.map((char) => (
          <div
            key={char.id}
            className="border border-gray-300 p-4 rounded shadow w-[150px] text-center"
          >
            <input
              type="checkbox"
              checked={selectedItems.some((i) => i.id === char.id)}
              onChange={(e) => {
                e.stopPropagation();
                toggleItem(char);
              }}
              className="mb-2 accent-blue-600 dark:accent-blue-400"
            />
            <img
              src={char.image}
              alt={char.name}
              width="150"
              className="w-full h-auto rounded mb-2"
            />
            <h4 className="font-semibold">{char.name}</h4>
            <p className="text-sm">Status: {char.status}</p>
            <p className="text-sm">Species: {char.species}</p>
            <button
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set('details', String(char.id));
                setSearchParams(newParams);
              }}
              className="text-blue-500 hover:underline mt-2"
            >
              View details
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        {page > 1 && (
          <button
            onClick={() => setSearchParams({ page: String(page - 1) })}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
        )}
        <button
          onClick={() => setSearchParams({ page: String(page + 1) })}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Results;
