import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { DUMMY_EXPENSES } from '../data/expenses';

const AllExpenses = () => {
  return (
    <ExpensesOutput expenses={DUMMY_EXPENSES} period="Total" />
  )
}

export default AllExpenses