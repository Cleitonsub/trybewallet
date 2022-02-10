// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET: {
    return {
      ...state,
      currencies: action.currencies,
      expenses: action.expenses,
    };
  }
  default:
    return state;
  }
};

export default walletReducer;
