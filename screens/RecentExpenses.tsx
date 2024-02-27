import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useAppSelector } from '../redux/hooks';
import { getDateMinusDays } from '../utils/date';

const RecentExpenses = () => {
  const { expenses } = useAppSelector(state => state.expenses);

  const recentExpenses = expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (expense.date > date7DaysAgo) && (expense.date <= today);
  })
  return (
    <ExpensesOutput expenses={recentExpenses} period="Last 7 Days" fallbackText='No recent registered expenses found!' />
  )
}

export default RecentExpenses