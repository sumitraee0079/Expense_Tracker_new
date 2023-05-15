import React, {useState, useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { CSVLink } from 'react-csv';
import api from 'services/api'
//Money formatter function

const Premium = ({ props }) => {
  const [state, setState] = useState(false)
  const { activatePremium } = useContext(GlobalContext);

  const [transactionData, setTransactionData] = useState([])
  const csvLink = useRef()

  const handleChange = (e) => {
      if (e.target.value > 1000) {
        setState({
          disabled: false
        })
      }
      else{
        setState({
          disabled: true
        })
      }
  }

  const getTransactionData = async () => {
    // 'api' just wraps axios with some setting specific to our app. the important thing here is that we use .then to capture the table response data, update the state, and then once we exit that operation we're going to click on the csv download link using the ref
    await api.post('/api/get_transactions_table', { game_id: gameId })
      .then((r) => setTransactionData(r.data))
      .catch((e) => console.log(e))
    csvLink.current.link.click()
  }

  return (
    <>
    <form>
      <input type="text" onChange={handleChange} placeholder="expense"></input>
    <button type="button" disabled={state.disabled} onClick={getTransactionData}>Download transactions to csv</button>
      <CSVLink
         data={transactionData}
         filename='transactions.csv'
         className='hidden'
         ref={csvLink}
         target='_blank'
      />
      </form>
    </>
    
  )
}

export default Premium

/*import React, { useState, useRef } from 'react'
import { Button } from 'react-bootstrap'
import { CSVLink } from 'react-csv'
import api from 'services/api'

const MyComponent = () => {
  const [transactionData, setTransactionData] = useState([])
  const csvLink = useRef() // setup the ref that we'll use for the hidden CsvLink click once we've updated the data

  const getTransactionData = async () => {
    // 'api' just wraps axios with some setting specific to our app. the important thing here is that we use .then to capture the table response data, update the state, and then once we exit that operation we're going to click on the csv download link using the ref
    await api.post('/api/get_transactions_table', { game_id: gameId })
      .then((r) => setTransactionData(r.data))
      .catch((e) => console.log(e))
    csvLink.current.link.click()
  }

  // more code here

  return (
  // a bunch of other code here...
    <div>
      <Button onClick={getTransactionData}>Download transactions to csv</Button>
      <CSVLink
         data={transactionData}
         filename='transactions.csv'
         className='hidden'
         ref={csvLink}
         target='_blank'
      />
    </div>
  )
}*/

{/*<button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>*/}