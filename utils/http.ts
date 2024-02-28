import axios from 'axios';
import { ExpenseInput } from '../redux/slices/expenses-slice';

const BACKEND_URL =
  'https://react-native-project-70dad-default-rtdb.firebaseio.com';

export const axsStoreExpense = async (expenseData: ExpenseInput) => {
  const response = await axios.post(
    BACKEND_URL + '/expenses.json',
    expenseData
  );
  const id = response.data.name;
  return id;
};

export const axsFetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + '/expenses.json');

  const expenses = [];

  console.log(response.data);

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const axsUpdateExpense = async (
  id: string,
  expenseData: ExpenseInput
) => {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
};

export const axsDeleteExpense = async (id: string) => {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
