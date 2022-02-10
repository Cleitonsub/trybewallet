// Coloque aqui suas actions

// action type
export const LOGIN = 'LOGIN';
export const WALLET = 'WALLET';

// action creator
export function login(email) {
  return {
    type: LOGIN,
    email,
  };
}

export function wallet(currencies, expenses) {
  return {
    type: WALLET,
    currencies,
    expenses,
  };
}
