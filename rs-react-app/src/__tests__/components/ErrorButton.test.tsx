import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import ErrorButton from '../../components/ErrorButton';

describe('ErrorButton', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    cleanup();
    consoleSpy?.mockRestore();
  });

  test('throws error when clicked', () => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<ErrorButton />);
      fireEvent.click(screen.getByRole('button', { name: /throw error/i }));
    }).toThrow('Test error from ErrorButton');
  });
});
