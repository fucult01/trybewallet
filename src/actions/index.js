// Coloque aqui suas actions
import { LOGIN_MODAL_OPEN } from '../constants';

export default function login(payload) {
  return {
    type: LOGIN_MODAL_OPEN,
    payload,
  };
}
