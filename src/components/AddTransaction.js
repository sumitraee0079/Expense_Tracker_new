import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';
import { Login } from './Login';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction, clearData } = useContext(GlobalContext);
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const post = { text: text, amount: amount }
    try {
      const res = await axios.post(`https://crudcrud.com/api/4f811379c22f4e139c595b8f2e4be17e/expenseData/`, post)
      console.log(res.data)
    } catch (e) {
      alert(e)
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    }

    addTransaction(newTransaction);

  

  }

  


  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
        <button className="btn" onClick={clearData}>Logout</button>
      </form>
    </>
  )
}