// Coloque aqui suas actions
import { LOGIN_MODAL_OPEN, GET_CURRENCIES } from '../constants';

export function userLogin(payload) {
  return {
    type: LOGIN_MODAL_OPEN,
    payload,
  };
}

export function saveCurrenciesToStore(payload) {
  return {
    type: GET_CURRENCIES,
    payload,
  };
}
