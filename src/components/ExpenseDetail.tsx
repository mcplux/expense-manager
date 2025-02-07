import { useMemo } from 'react'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list'
import { formatDate } from '../helpers'
import { Expense } from '../types'
import AmountDisplay from './AmountDisplay'
import { categories } from '../data/categories'

import 'react-swipeable-list/dist/styles.css'

interface ExpenseDetailProps {
  expense: Expense
}

function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const categoryInfo = useMemo(
    () => categories.filter((c) => c.id === expense.category)[0],
    [expense]
  )

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => {}} destructive>
        Delete
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => {}}>Update</SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img
              src={`/${categoryInfo.icon}-icon.svg`}
              alt={`${categoryInfo.name} Icon`}
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p>{expense.name}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default ExpenseDetail
