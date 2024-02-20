import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { DUMMY_EXPENSES } from '../data/expenses';

const RecentExpenses = () => {
  return (
    <ExpensesOutput expenses={DUMMY_EXPENSES} period="Last 7 Days" />
  )
}

export default RecentExpenses