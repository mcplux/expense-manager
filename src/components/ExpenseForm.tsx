import { ChangeEvent, useState } from 'react'
import DatePicker from 'react-date-picker'
import { categories } from '../data/categories'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { DraftExpense, Value } from '../types'

function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    name: '',
    category: '',
    date: new Date(),
  })

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

  return (
    <form className="space-y-5">
      <legend className="uppercase text-center text-xl font-black border-b-4 border-blue-500 ">
        New Expense
      </legend>

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
        Add Expense
      </button>
    </form>
  )
}

export default ExpenseForm
