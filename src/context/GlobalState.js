import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// Initial state loader (loads from localStorage when available)
const initialState = {
  transactions: []
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    AppReducer,
    initialState,
    () => {
      const localData = localStorage.getItem('transactions');
      if (!localData) return { transactions: [] };
      try {
        const parsed = JSON.parse(localData);
        // Normalize older transactions that may have used signed amounts
        const normalized = parsed.map(t => {
          const tt = { ...t };
          if (!tt.type) {
            if (typeof tt.amount === 'number') {
              tt.type = tt.amount < 0 ? 'Expense' : 'Income';
              tt.amount = Math.abs(tt.amount);
            } else {
              tt.type = 'Expense';
              tt.amount = Math.abs(Number(tt.amount) || 0);
            }
          }
          if (!tt.category) tt.category = 'General';
          if (!tt.date) tt.date = new Date().toISOString().slice(0,10);
          return tt;
        });
        return { transactions: normalized };
      } catch (e) {
        return { transactions: [] };
      }
    }
  );

  // Persist transactions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    } catch (e) {
      // ignore write errors (e.g., storage full)
    }
  }, [state.transactions]);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  function editTransaction(updatedTransaction) {
    dispatch({
      type: 'EDIT_TRANSACTION',
      payload: updatedTransaction
    });
  }

  function clearTransactions() {
    dispatch({
      type: 'CLEAR_TRANSACTIONS'
    });
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    deleteTransaction,
    addTransaction
    ,
    editTransaction,
    clearTransactions
  }}>
    {children}
  </GlobalContext.Provider>);
}