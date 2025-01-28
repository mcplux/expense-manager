import AmountDisplay from './AmountDisplay'

function BudgetTracker() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/graph.jpg" alt="Chart" />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
        >
          Reset App
        </button>

        <AmountDisplay label="Budget" amount={300} />
        <AmountDisplay label="Remaining" amount={200} />
        <AmountDisplay label="Spent" amount={100} />
      </div>
    </div>
  )
}

export default BudgetTracker
