import { useMemo } from 'react'
import { useBudget } from '../hooks/useBudget'
import ExpenseDetail from './ExpenseDetail'

function ExpenseList() {
  const { state } = useBudget()

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])

  return (
    <div className="mt-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl">No expenses, yet</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">Expenses</p>
          {state.expenses.map((e) => (
            <ExpenseDetail key={e.id} expense={e} />
          ))}
        </>
      )}
    </div>
  )
}

export default ExpenseList
