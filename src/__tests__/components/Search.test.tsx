import { expect, describe, afterEach, beforeEach, vi, test } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import Search from '../../components/Search';

describe('Search component', () => {
  let onSearchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    localStorage.clear();
    onSearchMock = vi.fn();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders input and button', () => {
    render(<Search onSearch={onSearchMock} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('displays saved value from localStorage on mount', () => {
    localStorage.setItem('search', 'saved search');
    render(<Search onSearch={onSearchMock} />);
    expect(screen.getByDisplayValue('saved search')).toBeInTheDocument();
  });

  test('shows empty input if no saved value', () => {
    render(<Search onSearch={onSearchMock} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('updates input value on change', () => {
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });

  test('saves trimmed search term to localStorage on submit', () => {
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  test term  ' } });
    fireEvent.click(button);

    expect(localStorage.getItem('search')).toBe('test term');
  });

  test('calls onSearch with trimmed input value', () => {
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '   test123  ' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('test123');
  });

  test('does not call onSearch if input is empty', () => {
    render(<Search onSearch={onSearchMock} />);
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeDisabled();
  });
});
