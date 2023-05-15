import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import { useHistory } from "react-router-dom";

const getLocalExpenseData = () => {

  let newExpenseData = localStorage.getItem("values")

  if (newExpenseData === []) {
    return []
  }
  else {
    return JSON.parse(newExpenseData)
  }
}

// Initial state
const initialState = {
  //transactions1: getLocalExpenseData(),
  transactions: []
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const history = useHistory()
  const [state, dispatch] = useReducer(AppReducer, initialState);

  

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

  

  const clearData = () => {
    dispatch({ type: "CLEAR_DATA" })
    console.log('transactions logout', state.transaction)
    localStorage.removeItem(state.transactions);
    history.push("/login");
  }

  useEffect(() => {
    localStorage.setItem("values", JSON.stringify(state.transactions))
    console.log('transactions', state.transaction)
  }, [state.transactions])

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    deleteTransaction,
    addTransaction,
    clearData
  }}>
    {children}
  </GlobalContext.Provider>);
}