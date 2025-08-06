import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import AboutPage from '../../pages/AboutPage';

describe('AboutPage', () => {
  test('renders author info and RS School link', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('heading', { name: /About This App/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Author: Anastasiia Pashkevych/i)
    ).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /RS School React Course/i });
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
