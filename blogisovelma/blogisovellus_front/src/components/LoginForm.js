import React from 'react';
import PropTypes from 'prop-types';
import styles from './Styling.js';

const LoginForm = ({
  loginVisibility, userName, pw,
  handleLogin,
  handleLoginVisibility}) => {
  return loginVisibility ?
    <div>
      <h4>Login</h4>
      <form id='loginForm' onSubmit={(event) => handleLogin(event)}>
        <input id='userNameField' autoComplete='false' style={styles().inputStyle1} required type='text'
          placeholder='Login: username' {...userName}/>
        <input id='passwordField' autoComplete='false' style={styles().inputStyle2} required type='password'
          placeholder='Login: password' {...pw}/>
        <input style={styles().inputStyle1} type='submit'/>
        <button style={styles().inputStyle2} onClick={() => handleLoginVisibility()}>{'Cancel'}</button>
      </form>
    </div> :
    <button style={styles().inputStyle1} onClick={() => handleLoginVisibility()}>{'Login'}</button>;
};

LoginForm.propTypes = {
  loginVisibility: PropTypes.bool.isRequired,
  handleLoginVisibility: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;