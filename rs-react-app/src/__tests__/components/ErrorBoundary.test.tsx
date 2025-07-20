import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import ErrorBoundary from '../../ErrorBoundary';
import ErrorButton from '../../components/ErrorButton';

describe('ErrorBoundary', () => {
  test('displays fallback UI when error is thrown', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: /throw error/i }));

    expect(
      screen.getByRole('heading', { name: /something went wrong/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /refresh page/i })
    ).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
