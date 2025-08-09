import { useQuery } from '@tanstack/react-query';
import { fetchCharacter } from '../api/rick';

export const characterKeys = {
  byId: (id: number) => ['character', { id }] as const,
};

export function useCharacterQuery(id: number) {
  return useQuery({
    queryKey: characterKeys.byId(id),
    queryFn: () => fetchCharacter(id),
    enabled: !!id,
  });
}
