import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from '../types'

export type BudgetActions =
  | {
      type: 'add-budget'
      payload: { budget: number }
    }
  | {
      type: 'show-modal'
    }
  | {
      type: 'hide-modal'
    }
  | {
      type: 'add-expense'
      payload: { expense: DraftExpense }
    }
  | {
      type: 'remove-expense'
      payload: { id: Expense['id'] }
    }
  | {
      type: 'get-expense-by-id'
      payload: { id: Expense['id'] }
    }
  | {
      type: 'update-expense'
      payload: { expense: Expense }
    }

export interface BudgetState {
  budget: number
  modal: boolean
  expenses: Expense[]
  editingId: Expense['id']
}

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
  editingId: '',
}

const createExpense = (draft: DraftExpense): Expense => {
  return { ...draft, id: uuidv4() }
}

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
): BudgetState => {
  if (action.type === 'add-budget') {
    return {
      ...state,
      budget: action.payload.budget,
    }
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true,
    }
  }

  if (action.type === 'hide-modal') {
    return {
      ...state,
      modal: false,
      editingId: '',
    }
  }

  if (action.type === 'add-expense') {
    const expense = createExpense(action.payload.expense)

    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false,
    }
  }

  if (action.type === 'remove-expense') {
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.payload.id),
    }
  }

  if (action.type === 'get-expense-by-id') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    }
  }

  if (action.type === 'update-expense') {
    return {
      ...state,
      expenses: state.expenses.map((e) =>
        e.id === action.payload.expense.id ? action.payload.expense : e
      ),
      modal: false,
      editingId: '',
    }
  }

  return state
}
