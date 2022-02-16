import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email } = this.state;
    const { history, dispatchEmail } = this.props;
    dispatchEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const minPassword = 6;
    let buttonValidation = true;

    if (email.includes('@' && '.com') && password.length >= minPassword) {
      buttonValidation = false;
    } else {
      buttonValidation = true;
    }

    return (
      <form onSubmit={ this.handleSubmit }>
        <h1>Login</h1>
        <label htmlFor="enter-email">
          <input
            type="email"
            data-testid="email-input"
            id="enter-email"
            name="email"
            value={ email }
            placeholder="Email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-enter">
          <input
            type="password"
            data-testid="password-input"
            id="password-enter"
            name="password"
            placeholder="Senha"
            minLength={ minPassword }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          id="enter-button"
          disabled={ buttonValidation }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);
// Essa forma de connect ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ é abrebiação de:
// const resultConnect = connect(null, mapDispatchToProps);
// export resultConnect(Login);
