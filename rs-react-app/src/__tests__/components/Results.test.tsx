import { cleanup, render, screen } from '@testing-library/react';
import { expect, describe, beforeEach, afterEach, vi, test } from 'vitest';
import Results from '../../components/Results';

describe('Results component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders loading state initially', () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));
    render(<Results searchTerm="" />);
    const loaders = screen.getAllByRole('presentation');
    expect(loaders.length).toBeGreaterThan(0);
  });

  test('renders characters when data is provided', async () => {
    const mockData = {
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          image: 'rick.png',
          status: 'Alive',
          species: 'Human',
        },
      ],
    };

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    render(<Results searchTerm="Rick" />);

    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/status: alive/i)).toBeInTheDocument();
    expect(screen.getByText(/species: human/i)).toBeInTheDocument();
  });

  test('shows "no results" error when fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    render(<Results searchTerm="unknown" />);

    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
  });

  test('handles missing props gracefully', async () => {
    const mockData = {
      results: [
        {
          id: 1,
          name: 'Unknown Character',
          image: '',
          status: '',
          species: '',
        },
      ],
    };

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    render(<Results searchTerm="test" />);

    expect(await screen.findByText(/unknown character/i)).toBeInTheDocument();
    expect(screen.getByText(/status:/i)).toBeInTheDocument();
    expect(screen.getByText(/species:/i)).toBeInTheDocument();
  });

  test('loading indicators have appropriate ARIA label', () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));
    render(<Results searchTerm="" />);
    const loaders = screen.getAllByLabelText(/loading character placeholder/i);
    expect(loaders.length).toBeGreaterThan(0);
  });
});
