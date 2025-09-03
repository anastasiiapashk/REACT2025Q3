import { render, screen, cleanup } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../../App';
import { ThemeProvider } from '../../context/ThemeContext';

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('loads initial searchTerm from localStorage and fetches results', async () => {
    localStorage.setItem('search', 'Rick');

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            image: 'rick.png',
            status: 'Alive',
            species: 'Human',
          },
        ],
      }),
    } as Response);

    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
  });

  test('displays loading state during fetch', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    expect(screen.getAllByRole('presentation').length).toBeGreaterThan(0);
  });

  test('handles API errors gracefully', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
  });
});
