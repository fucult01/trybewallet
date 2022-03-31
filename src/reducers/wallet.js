// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const wallet = {
  currencies: [],
  expenses: [],
};

export default function walletReducer(state = wallet, action) {
  switch (action.type) {
  case 'SOMETHING': {
    return 'hey';
  }
  default: return state;
  }
}
