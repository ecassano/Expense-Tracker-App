import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useAppSelector } from '../redux/hooks';

const AllExpenses = () => {
  const { expenses } = useAppSelector(state => state.expenses);
  return (
    <ExpensesOutput expenses={expenses} period="Total" fallbackText='No registered expenses found' />
  )
}

export default AllExpenses