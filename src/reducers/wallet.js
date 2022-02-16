// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ADDEXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [
    'USD',
    'CAD',
    'EUR',
    'GBP',
    'ARS',
    'BTC',
    'LTC',
    'JPY',
    'CHF',
    'AUD',
    'CNY',
    'ILS',
    'ETH',
    'XRP',
  ],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
  case ADDEXPENSE: {
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          value: action.payload.value,
          description: action.payload.description,
          currency: action.payload.currency,
          method: action.payload.method,
          tag: action.payload.tag,
          exchangeRates: action.payload.exchangeRates,
        },
      ],
    };
  }
  default:
    return state;
  }
};

export default walletReducer;
