import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndStore } from './testsConfig';

describe('5 - Teste a Barra Search', () => {
  renderWithRouterAndStore(<App />);
  const { history } = renderWithRouterAndStore(<App />);
  history.push('/foods');

  const searchBtn = screen.getByTestId('search-top-btn');
  const searchInput = screen.getByTestId('search-input');
  const nameRadio = screen.getByTestId('name-search-radio');
  const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
  const ingredientRadio = screen.getByTestId('ingredient-search-radio"');
  const execBtn = screen.getByTestId('exec-search-btn');

  userEvent.click(searchBtn);

  it('Contém os elementos desejados', () => {});
  expect(searchInput).toBeinTheDocument();
  expect(nameRadio).toBeinTheDocument();
  expect(firstLetterRadio).toBeinTheDocument();
  expect(ingredientRadio).toBeinTheDocument();
  expect(execBtn).toBeinTheDocument();
});
