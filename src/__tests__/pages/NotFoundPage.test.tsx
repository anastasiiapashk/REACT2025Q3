import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import NotFoundPage from '../../pages/NotFoundPage';

describe('NotFoundPage', () => {
  test('renders 404 message', () => {
    render(<NotFoundPage />);
    expect(
      screen.getByRole('heading', { name: /404 - page not found/i })
    ).toBeInTheDocument();
  });
});
