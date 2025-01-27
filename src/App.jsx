import React, { useState } from 'react'
import './App.css'
import ExpensesForm from './component/ExpensesForm'
import ExpensesTable from './component/ExpensesTable'
import expenseData from './expenseData'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const [expense, setExpense] = useLocalStorage('expense',{
    title: '',
    category: '',
    amount: '',
   // email:''
  })
  const [expenses, setExpenses] = useLocalStorage('expenses', expenseData)
  const [editingRowId,setEditingRowID]=useLocalStorage('editingRowId','');
  //const [localData,setLocalData]=useLocalStorage('myum',[1,2,3]);
  
  return (
    <main>
    <h1>Track Your Expense</h1>
    <div className="expense-tracker">
      <ExpensesForm setExpenses={setExpenses} setExpense={setExpense} expense={expense} editingRowId={editingRowId} setEditingRowID={setEditingRowID}/>
      <ExpensesTable expenses={expenses} setExpense={setExpense} setExpenses={setExpenses} setEditingRowID={setEditingRowID}/>
    </div>
  </main>
  )
}
