// Coloque aqui suas actions

// action type
export const LOGIN = 'LOGIN';

// action creator
export function login(email) {
  return {
    type: LOGIN,
    email,
  };
}
