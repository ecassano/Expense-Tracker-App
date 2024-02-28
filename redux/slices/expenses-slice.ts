import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { DUMMY_EXPENSES } from '../../data/expenses';

export interface ExpenseInput {
  description: string;
  amount: number;
  date: Date;
}

type Update = {
  id: string;
  expenseData: ExpenseInput;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export interface ExpensesSlice {
  expenses: Expense[];
}

const initialState: ExpensesSlice = {
  expenses: [],
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      const id = new Date().toString() + Math.random().toString();
      state.expenses = [action.payload, ...state.expenses];
    },
    updateExpense: (state, action: PayloadAction<Update>) => {
      const expenseToUpdateId = state.expenses.findIndex(
        expense => expense.id === action.payload.id
      );
      state.expenses[expenseToUpdateId].description =
        action.payload.expenseData.description;
      state.expenses[expenseToUpdateId].amount =
        action.payload.expenseData.amount;
      state.expenses[expenseToUpdateId].date = action.payload.expenseData.date;
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        expense => expense.id !== action.payload
      );
    },
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      const inverted = action.payload.reverse();
      state.expenses = inverted;
    },
  },
});

export const { addExpense, updateExpense, deleteExpense, setExpenses } =
  expensesSlice.actions;
export default expensesSlice.reducer;
