import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero headline', () => {
  render(<App />);
  expect(screen.getByText(/Sauce that drips/i)).toBeInTheDocument();
});

test('shows the restaurant menu intro', () => {
  render(<App />);
  expect(screen.getByText(/A menu made for late-night cravings/i)).toBeInTheDocument();
});
