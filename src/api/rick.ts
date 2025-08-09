export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};
export type PagedResult = {
  info: { pages: number; count: number };
  results: Character[];
};

export async function fetchCharacters(
  page = 1,
  query = ''
): Promise<PagedResult> {
  const url = new URL('https://rickandmortyapi.com/api/character');
  if (page) url.searchParams.set('page', String(page));
  if (query) url.searchParams.set('name', query);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchCharacter(id: number): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
