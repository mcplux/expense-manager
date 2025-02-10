import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import DatePicker from 'react-date-picker'
import { categories } from '../data/categories'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { DraftExpense, Value } from '../types'
import ErrorMessage from './ErrorMessage'
import { useBudget } from '../hooks/useBudget'

function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    name: '',
    category: '',
    date: new Date(),
  })

  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)

  const { state, dispatch, remainingBudget } = useBudget()

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.find(
        (e) => e.id === state.editingId
      )
      if (editingExpense) {
        setExpense(editingExpense)
        setPreviousAmount(editingExpense.amount)
      }
    }
  }, [state])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name)

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({ ...expense, date: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validation
    if (Object.values(expense).includes('')) {
      setError('All fields are required')
      return
    }

    if (expense.amount - previousAmount > remainingBudget) {
      setError('This expense is out of the budget')
      return
    }

    if (state.editingId) {
      dispatch({
        type: 'update-expense',
        payload: { expense: { ...expense, id: state.editingId } },
      })
    } else {
      dispatch({ type: 'add-expense', payload: { expense } })
    }

    setExpense({
      amount: 0,
      name: '',
      category: '',
      date: new Date(),
    })
    setPreviousAmount(0)
    setError('')
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-xl font-black border-b-4 border-blue-500 ">
        {state.editingId ? 'Update Expense' : 'New Expense'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2 ">
        <label htmlFor="name" className="text-xl">
          Expense Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="e.g. Amazon Prime Video"
          className="bg-slate-100 p-2"
          value={expense.name}
          name="name"
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <label htmlFor="amount" className="text-xl">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          placeholder="e.g. 10"
          className="bg-slate-100 p-2"
          value={expense.amount}
          name="amount"
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <label htmlFor="category" className="text-xl">
          Category
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          value={expense.category}
          name="category"
          onChange={handleChange}
        >
          <option value="">---Select a category---</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 ">
        <label className="text-xl">Expense Date</label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
      >
        {state.editingId ? 'Save Changes' : 'Add Expense'}
      </button>
    </form>
  )
}

export default ExpenseForm
