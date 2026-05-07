import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

test('renders player search form', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByRole('heading', { name: /find player stats/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/steam player name/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
});
