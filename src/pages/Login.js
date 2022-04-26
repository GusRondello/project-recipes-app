import React, { useEffect, useState } from 'react';

function Login() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleLoginButton = () => {
    const stringifyEmail = JSON.stringify({ email: userInfo.email });
    window.localStorage.setItem('mealsToken', '1');
    window.localStorage.setItem('cocktailsToken', '1');
    window.localStorage.setItem('user', stringifyEmail);
  };

  useEffect(() => {
    const validateForm = () => {
      const { email, password } = userInfo;
      const regex = /\S+@\S+\.\S+/;
      const minPasswordLength = 6;
      const validateEmail = regex.test(email);
      const validatePassword = password.length > minPasswordLength;
      if (validateEmail && validatePassword) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    };
    validateForm();
  }, [userInfo]);

  return (
    <>
      <h1>Login</h1>
      <form>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          onChange={ handleInputChange }
          value={ userInfo.email }
          placeholder="E-mail"
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          onChange={ handleInputChange }
          value={ userInfo.password }
          placeholder="Password"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isButtonDisabled }
          onClick={ handleLoginButton }
        >
          Enter
        </button>
      </form>
    </>
  );
}

export default Login;
