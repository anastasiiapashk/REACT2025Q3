import { useSearchParams } from 'react-router-dom';
import Search from '../components/Search';
import Results from '../components/Results';
import Details from '../components/Details';
import useLocalStorage from '../hooks/useLocalStorage';
import Flyout from '../components/Flyout';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('search', '');
  const [searchParams, setSearchParams] = useSearchParams();
  const hasDetails = searchParams.get('details');

  return (
    <div className="p-4">
      <div className="flex">
        <div className={hasDetails ? 'w-1/2' : 'w-full'}>
          <Search onSearch={setSearchTerm} />
          <Results searchTerm={searchTerm} />
          <Flyout />
        </div>
        {hasDetails && (
          <div className="w-1/2 p-4 border-l">
            <Details
              id={hasDetails}
              onClose={() => {
                searchParams.delete('details');
                setSearchParams(searchParams);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
