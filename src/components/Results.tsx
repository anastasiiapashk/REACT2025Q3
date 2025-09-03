import { type FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelectedItemsStore } from '../store/selectedItemsStore';
import LoadingSkeletons from './LoadingSkeletons';

// ✅ наш кастомний хук на TanStack Query
import {
  useCharactersQuery,
  charactersKeys,
} from '../queries/useCharactersQuery';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  searchTerm: string;
}

const Results: FC<Props> = ({ searchTerm }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);

  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const toggleItem = useSelectedItemsStore((state) => state.toggleItem);

  // ✅ головний запит: кешується за ключем ['characters','list',{page,q}]
  const { data, isLoading, isError, error, isFetching } = useCharactersQuery(
    page,
    searchTerm
  );

  // ✅ при зміні пошуку починаємо з 1 сторінки
  useEffect(() => {
    setSearchParams({ page: '1' });
  }, [searchTerm, setSearchParams]);

  const qc = useQueryClient();

  const handleOpenDetails = (id: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('details', String(id));
    setSearchParams(next);
  };

  const handlePrev = () =>
    setSearchParams({ page: String(Math.max(1, page - 1)) });
  const handleNext = () => setSearchParams({ page: String(page + 1) });

  const handleRefresh = () =>
    qc.invalidateQueries({ queryKey: charactersKeys.list(page, searchTerm) });

  // ✅ стани
  if (isLoading) return <LoadingSkeletons />;

  if (isError) {
    return (
      <div className="space-y-2">
        <p className="text-red-600 dark:text-red-400">
          {(error as Error)?.message || 'Something went wrong'}
        </p>
        <button
          onClick={handleRefresh}
          className="px-3 py-1.5 border rounded-md
                     border-slate-300 bg-white text-slate-800
                     dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          Try again
        </button>
      </div>
    );
  }

  const list = data?.results ?? [];

  return (
    <div className={`${selectedItems.length > 0 ? 'pb-20' : ''}`}>
      {/* верхня панель з Refresh + тонкий індикатор фетчингу */}
      <div className="mb-3 flex items-center gap-3">
        <button
          onClick={handleRefresh}
          className="px-3 py-1.5 border rounded-md
                     border-slate-300 bg-white text-slate-800
                     dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          title="Force refresh (invalidate cache)"
        >
          Refresh
        </button>
        {isFetching && (
          <span className="text-sm opacity-70 animate-pulse">Updating…</span>
        )}
      </div>

      {list.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">No results found</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {list.map((char) => (
            <div
              key={char.id}
              className="w-[150px] text-center rounded shadow-sm border
                         border-slate-200 bg-white
                         dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="p-4">
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
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                  {char.name}
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Status: {char.status}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Species: {char.species}
                </p>
                <button
                  onClick={() => handleOpenDetails(char.id)}
                  className="text-blue-600 dark:text-blue-400 hover:underline mt-2"
                >
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* пагінація */}
      <div className="mt-4 flex gap-2">
        {page > 1 && (
          <button onClick={handlePrev} className="px-3 py-1 border rounded">
            Prev
          </button>
        )}
        <button onClick={handleNext} className="px-3 py-1 border rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default Results;
