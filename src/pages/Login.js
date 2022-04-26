import React from 'react';

function Login() {
  return (
    <>
      <h1>Login</h1>
      <form>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          // onChange={ handleInputChange }
          placeholder="E-mail"
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          // onChange={ handleInputChange }
          placeholder="Password"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </>
  );
}

export default Login;
