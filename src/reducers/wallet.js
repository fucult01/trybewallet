// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, SAVE_EXPENSES } from '../constants';

const wallet = {
  currencies: [],
  expenses: [],
};

export default function walletReducer(state = wallet, action) {
  switch (action.type) {
  case GET_CURRENCIES: {
    return {
      ...state,
      currencies: action.payload,
    };
  }
  case SAVE_EXPENSES: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  }
  default: return state;
  }
}
