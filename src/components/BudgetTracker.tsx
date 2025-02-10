import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudget } from '../hooks/useBudget'
import AmountDisplay from './AmountDisplay'

import 'react-circular-progressbar/dist/styles.css'

function BudgetTracker() {
  const { state, remainingBudget, totalExpenses } = useBudget()

  const percentageRemainingBudget = +(
    (remainingBudget * 100) /
    state.budget
  ).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentageRemainingBudget}
          styles={buildStyles({
            pathColor: percentageRemainingBudget < 10 ? '#D62626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textSize: 8,
            textColor: percentageRemainingBudget < 10 ? '#D62626' : '#3B82F6',
          })}
          text={`${percentageRemainingBudget}% Remaining`}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
        >
          Reset App
        </button>

        <AmountDisplay label="Budget" amount={state.budget} />
        <AmountDisplay label="Remaining" amount={remainingBudget} />
        <AmountDisplay label="Spent" amount={totalExpenses} />
      </div>
    </div>
  )
}

export default BudgetTracker
