import { ChangeEvent, useMemo, useState } from 'react'

function BudgetForm() {
  const [budget, setBudget] = useState(0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value)
  }

  const isValid = useMemo(() => {
    return budget > 0
  }, [budget])

  return (
    <form className="space-y-5">
      <div className="flex flex-col space-y-5 ">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Define a budget
        </label>
        <input
          id="budget"
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="e.g. 500, 800"
          value={budget}
          onChange={handleChange}
        />
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer w-full p-2 text-white uppercase font-black"
        disabled={!isValid}
      >
        Define Budget
      </button>
    </form>
  )
}

export default BudgetForm
