import { useMemo } from 'react'
import { useBudget } from '../hooks/useBudget'
import ExpenseDetail from './ExpenseDetail'

function ExpenseList() {
  const { state } = useBudget()
  const filteredExpenses = state.currentCategory
    ? state.expenses.filter((e) => e.category === state.currentCategory)
    : state.expenses

  const isEmpty = useMemo(
    () => filteredExpenses.length === 0,
    [filteredExpenses]
  )

  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-5">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl">No expenses, yet</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold">Expenses</p>
          {filteredExpenses.map((e) => (
            <ExpenseDetail key={e.id} expense={e} />
          ))}
        </>
      )}
    </div>
  )
}

export default ExpenseList
