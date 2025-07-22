import { cleanup, render, screen } from '@testing-library/react';
import { describe, test, expect, afterEach } from 'vitest';
import LoadingSkeletons from '../../components/LoadingSkeletons';

describe('LoadingSkeletons', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders 6 loading placeholders', () => {
    render(<LoadingSkeletons />);
    const skeletons = screen.getAllByRole('presentation');
    expect(skeletons).toHaveLength(6);
  });
});
