import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndStore } from './testsConfig';

const VALID_EMAIL = 'email@email.com';
const VALID_PASSWORD = '123456';
const INVALID_EMAIL_0 = 'email';
const INVALID_EMAIL_1 = 'email@com@';
const INVALID_EMAIL_2 = 'emailcom@';
const INVALID_EMAIL_3 = 'email@email.';
const INVALID_PASSWORD = '23456';

describe('1 - Teste se a Pagina de Login', () => {
  it('Esta na rota /', () => {
    const { history } = renderWithRouterAndStore(<App />);
    expect(history.location.pathname).toBe('/');
  });
  it('Contem os imputs desejados', () => {
    renderWithRouterAndStore(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
  it('Contem validacao do e-mail e senha de forma a desabilitar o botao', () => {
    renderWithRouterAndStore(<App />);

    const loginBtn = screen.getByTestId('login-submit-btn');
    expect(loginBtn).toBeDisabled();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, INVALID_EMAIL_0);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, INVALID_EMAIL_1);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, INVALID_EMAIL_2);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, INVALID_EMAIL_3);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(loginBtn).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeEnabled();
  });
});
