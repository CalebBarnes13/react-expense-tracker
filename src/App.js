import React, { useState, useEffect } from 'react'
import './App.css';
import { Container } from 'reactstrap'
import Logo from './logo.svg'
import Form from './components/Form'
import List from './components/List'

const ALL_EXPENSES = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []

function App() {
  const [expenses, setExpenses] = useState(ALL_EXPENSES)

  const [ name, setName ] = useState('')
  const [ amount, setAmount ] = useState('')

  const handleName = event => {
    console.log('Name ', event.target.value)
    setName(event.target.value)
  }

  const handleAmount = event => {
    console.log('Amoount ', event.target.value)
    setAmount(event.target.value)
  }

  const handleClearExpenses = () => {
    setExpenses ([])
  }

  const handleSubmitForm = event => {
    event.preventDefault()

    if (name !== '' && amount > 0) {
      const expense = { name, amount }
      setExpenses([...expenses, expense])

      setName('')
      setAmount('')
    } else {
      console.log('Invalid expense name or the amount')
    }
  }

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  return (
    <Container className="text-center">
      <div className='jumbotron'>
        <h3 className='display-6 text-center'>
          Expense Tracker React App
          <img src={Logo} style={{ width: 50, height:50 }} alt="react-logo"/>
        </h3>
            <div>
              <p>
              Total Expenses{' '}
              <span className='text-success'>
                ${' '}
                {expenses.reduce((accumulator, currentValue) => {
                  return (accumulator += parseInt(currentValue.amount))
                }, 0)}
              </span> 
              </p>
            </div>
            <Form
            name={name}
            amount={amount}
            handleName={handleName}
            handleAmount={handleAmount}
            handleSubmitForm={handleSubmitForm}
            handleClearExpenses={handleClearExpenses}
            />
            <List expenses={expenses}/>
        </div>
    </Container>
  );
}

export default App;
