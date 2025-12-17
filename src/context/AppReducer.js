export default (state, action) => {
  switch(action.type) {
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      }
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(tx => tx.id === action.payload.id ? { ...tx, ...action.payload } : tx)
      }
    case 'CLEAR_TRANSACTIONS':
      return {
        ...state,
        transactions: []
      }
    default:
      return state;
  }
}