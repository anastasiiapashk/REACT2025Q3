import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../api/rick';

export const charactersKeys = {
  all: ['characters'] as const,
  list: (page: number, q: string) =>
    [...charactersKeys.all, 'list', { page, q }] as const,
};

export function useCharactersQuery(page: number, q: string) {
  return useQuery({
    queryKey: charactersKeys.list(page, q),
    queryFn: () => fetchCharacters(page, q),
    // keepPreviousData: true,
  });
}
