import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testing component <App>', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('show fixed links in top navigation', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', { name: /home/i });
    const about = getByRole('link', { name: /about/i });
    const favoritePokemons = getByRole('link', { name: /favorite pokémons/i });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Home', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', { name: /home/i });
    expect(home).toHaveTextContent(/^Home$/);
  });

  test('O segundo link deve possuir o texto About', () => {
    const { getByRole } = renderWithRouter(<App />);
    const about = getByRole('link', { name: /about/i });
    expect(about).toHaveTextContent(/^About$/);
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const favoritePokemons = getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokemons).toHaveTextContent(/^Favorite Pokémons$/);
  });

  test('Ao clicar em Home é redirecionada para a página inicial', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const home = getByRole('link', { name: /home/i });
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Ao clicar em About é redirecionada para a página /about', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const about = getByRole('link', { name: /about/i });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Ao clicar em Favorite Pokémons é redirecionada para a página /favorites', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favoritePokemons = getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Ao acessar a rota /teste é redirecionada a página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/teste');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
