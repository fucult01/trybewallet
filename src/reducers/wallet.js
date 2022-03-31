// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES } from '../constants';

const wallet = {
  currencies: [],
  expenses: [],
};

export default function walletReducer(state = wallet, action) {
  switch (action.type) {
  case GET_CURRENCIES: {
    return {
      currencies: action.payload,
    };
  }
  default: return state;
  }
}
