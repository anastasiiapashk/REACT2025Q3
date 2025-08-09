import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ErrorBoundary from '../../ErrorBoundary';

const ProblemComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  test('renders children if no error', () => {
    render(
      <ErrorBoundary>
        <p>Everything works fine</p>
      </ErrorBoundary>
    );
    expect(screen.getByText(/everything works fine/i)).toBeInTheDocument();
  });

  test('catches error and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblemComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /refresh page/i })
    ).toBeInTheDocument();
  });
});
