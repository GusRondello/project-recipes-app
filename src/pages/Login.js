import 'bootstrap';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import '../styles/Login.css';

function Login({ history }) {
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

    history.push('/foods');
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
    <div className="login_container">
      <div className="login_wrapper">
        <form>
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <div className="mb-3">
            <input
              className="form-control"
              name="email"
              type="email"
              data-testid="email-input"
              onChange={ handleInputChange }
              value={ userInfo.email }
              placeholder="E-mail"
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              name="password"
              type="password"
              data-testid="password-input"
              onChange={ handleInputChange }
              value={ userInfo.password }
              placeholder="Password"
            />
          </div>
          <button
            className="w-100 btn btn-lg"
            type="button"
            data-testid="login-submit-btn"
            disabled={ isButtonDisabled }
            onClick={ handleLoginButton }
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
