import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DUMMY_EXPENSES } from "../../data/expenses";

export interface ExpenseInput {
  description: string;
  amount: number;
  date: Date;
}

type Update = {
  id: string;
  expenseData: ExpenseInput;
}

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export interface ExpensesSlice {
  expenses: Expense[]
}

const initialState: ExpensesSlice = {
  expenses: DUMMY_EXPENSES,
}

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseInput>) => {
      const id = new Date().toString() + Math.random().toString();
      state.expenses = [{id, ...action.payload}, ...state.expenses];
    },
    updateExpense: (state, action: PayloadAction<Update>) => {
      const expenseToUpdateId = state.expenses.findIndex(expense => expense.id === action.payload.id);
      state.expenses[expenseToUpdateId].description = action.payload.expenseData.description;
      state.expenses[expenseToUpdateId].amount = action.payload.expenseData.amount;
      state.expenses[expenseToUpdateId].date = action.payload.expenseData.date;
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    }
  }
});

export const {addExpense, updateExpense, deleteExpense} = expensesSlice.actions;
export default expensesSlice.reducer;