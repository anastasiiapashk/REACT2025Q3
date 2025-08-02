import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import * as SearchModule from '../../components/Search';
import * as ResultsModule from '../../components/Results';

describe('HomePage', () => {
  beforeEach(() => {
    Storage.prototype.getItem = vi.fn(() => '');
  });

  test('updates search term when Search input changes', () => {
    vi.spyOn(SearchModule, 'default').mockImplementation(({ onSearch }) => (
      <input
        data-testid="search-input"
        placeholder="Mock Search"
        onChange={(e) => onSearch(e.target.value)}
      />
    ));

    vi.spyOn(ResultsModule, 'default').mockImplementation(({ searchTerm }) => (
      <div data-testid="mock-results">{searchTerm}</div>
    ));

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Rick' } });

    expect(screen.getByTestId('mock-results')).toHaveTextContent('Rick');
  });
});
