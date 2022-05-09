import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndStore } from './testsConfig';

describe('2 - Teste se o Header', () => {
  renderWithRouterAndStore(<App />);
  const profileBtn = screen.getByTestId('profile-top-btn');
  const pageTitle = screen.getByTestId('page-title');
  const searchBtn = screen.getByTestId('search-top-btn');

  const hasHeader = () => {
    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  };

  it('Está nas páginas corretas', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/foods');
    expect(hasHeader).toBeInTheDocument();

    history.push('/drinks');
    expect(hasHeader).toBeInTheDocument();

    history.push('/explore');
    expect(hasHeader).toBeInTheDocument();

    history.push('/explore/foods');
    expect(hasHeader).toBeInTheDocument();

    history.push('/explore/drinks');
    expect(hasHeader).toBeInTheDocument();

    history.push('/explore/foods/ingredients');
    expect(hasHeader).toBeInTheDocument();

    history.push('/explore/drinks/ingredients');
    expect(hasHeader).toBeInTheDocument();

    history.push('/explore/foods/nationalities');
    expect(hasHeader).toBeInTheDocument();

    history.push('/done-recipes');
    expect(hasHeader).toBeInTheDocument();

    history.push('/favorite-recipes');
    expect(hasHeader).toBeInTheDocument();
  });
  it('Não está nas páginas erradas', () => {
    const { history } = renderWithRouterAndStore(<App />);

    history.push('/');
    expect(hasHeader).not.toBeInTheDocument();

    history.push('/foods/52771');
    expect(hasHeader).not.toBeInTheDocument();

    history.push('/drinks/178319');
    expect(hasHeader).not.toBeInTheDocument();

    history.push('/foods/52771/in-progress');
    expect(hasHeader).not.toBeInTheDocument();

    history.push('/drinks/178319/in-progress');
    expect(hasHeader).not.toBeInTheDocument();
  });
});

describe('3 - Testa o botão de Perfil redireciona para a página do perfil', () => {
  renderWithRouterAndStore(<App />);
  const { history } = renderWithRouterAndStore(<App />);
  history.push('/foods');

  const profileBtn = screen.getByTestId('profile-top-btn');
  const pageTitle = screen.getByTestId('page-title');
  userEvent.click(profileBtn);

  expect(pageTitle).contains('Profile');
});

describe('4 - Testa o botão de Busca', () => {
  renderWithRouterAndStore(<App />);
  const { history } = renderWithRouterAndStore(<App />);
  history.push('/foods');
  const searchBtn = screen.getByTestId('search-top-btn');
  const searchInput = screen.getByTestId('search-input');

  it('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    userEvent.click(searchBtn);

    expect(searchInput).toBeInTheDocument();
  });
  it('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    userEvent.click(searchBtn);
    userEvent.click(searchBtn);

    expect(searchInput).not.toBeInTheDocument();
  });
});
