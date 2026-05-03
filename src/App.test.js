import { render, screen } from '@testing-library/react';
import App from './App';




test('renders hero headline', () => {
  render(<App />);
  expect(screen.getByText(/Sauce that drips/i)).toBeInTheDocument();
});
