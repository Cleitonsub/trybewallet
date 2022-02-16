// Coloque aqui suas actions

// action type
export const LOGIN = 'LOGIN';
export const ADDEXPENSE = 'ADDEXPENSE';
// export const REQ_API = 'REQ_API';

// action creator
export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

export function addExpense(payload) {
  return {
    type: ADDEXPENSE,
    payload,
  };
}

// export function awesomeApi() {
//   return async () => {
//     try {
//       const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//       const data = await response.json();
//       return {
//         type: REQ_API,
//         data,
//       };
//     } catch (error) {
//       return {
//         data: error,
//       };
//     }
//   };
// }
