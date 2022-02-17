import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense } from '../actions';
import { awesomeApi } from '../services/reqApi';

class FormWallet extends React.Component {
  constructor() {
    super();

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      total: 0,
    };
  }

  componentDidMount() {
    awesomeApi();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSave(event) {
    event.preventDefault();
    const { dispatchExpenses } = this.props;

    this.setState({
      exchangeRates: await awesomeApi(),
    });
    const { value, description, currency, method, tag, exchangeRates } = this.state;

    this.setState((prevState) => ({
      // value: value * exchangeRates[currency].ask,
      total: prevState.total + value * exchangeRates[currency].ask,
    }));

    await dispatchExpenses({ value, description, currency, method, tag, exchangeRates });
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      exchangeRates: {},
    });
  }

  render() {
    const { value, description, currency, total } = this.state;
    const { email, currencies } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ total.toFixed(2) }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <input
            type="number"
            data-testid="value-input"
            id="value-input"
            placeholder="Valor"
            min={ 0 }
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
          <input
            data-testid="description-input"
            id="description-input"
            placeholder="Descrição"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <label htmlFor="currency-input">
            Moeda
            <select
              data-testid="currency-input"
              id="currency-input"
              placeholder="Moeda"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((curr) => (
                <option key={ curr } data-testid={ curr }>
                  { curr }
                </option>
              )) }
            </select>
          </label>
          <label htmlFor="method-input">
            Modo de pagamento
            <select
              data-testid="method-input"
              id="method-input"
              name="method"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag
            <select
              data-testid="tag-input"
              id="tag-input"
              name="tag"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={ this.handleSave }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

FormWallet.propTypes = {
  dispatchExpenses: PropTypes.func,
  email: PropTypes.string,
  currencies: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (state) => dispatch(addExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
