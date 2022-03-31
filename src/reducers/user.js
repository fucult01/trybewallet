// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_MODAL_OPEN } from '../constants';

const user = {
  email: '',
};

export default function loginReducer(state = user, action) {
  switch (action.type) {
  case LOGIN_MODAL_OPEN:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}
