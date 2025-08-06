import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import Details from '../../components/Details';

describe('Details component', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    image: 'https://rick.png',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders loading state initially', () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));
    render(<Details id="1" onClose={() => {}} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders character details after fetch', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockCharacter,
    } as Response);

    render(<Details id="1" onClose={() => {}} />);
    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/status: alive/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
  });

  test('renders fallback when no data', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => null,
    } as Response);

    render(<Details id="999" onClose={() => {}} />);
    await waitFor(() => {
      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });
  });

  test('calls onClose when button is clicked', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockCharacter,
    } as Response);

    const onClose = vi.fn();
    render(<Details id="1" onClose={onClose} />);

    await screen.findByText(/rick sanchez/i);
    screen.getByTestId('close-button').click();
    expect(onClose).toHaveBeenCalled();
  });
});
