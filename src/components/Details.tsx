import { useEffect, useState } from 'react';

interface Props {
  id: string;
  onClose: () => void;
}

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
}

export default function Details({ id, onClose }: Props) {
  const [data, setData] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div>
      <button data-testid="close-button" onClick={onClose}>
        Close
      </button>
      <h2>{data.name}</h2>
      <p>Status: {data.status}</p>
      <img src={data.image} alt={data.name} />
    </div>
  );
}
