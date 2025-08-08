import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary.tsx';
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import Header from './components/Header.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path=":page" element={<HomePage />} />
            <Route path=":page/:id" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
