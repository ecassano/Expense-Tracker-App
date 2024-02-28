import { useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setExpenses } from '../redux/slices/expenses-slice';
import { getDateMinusDays } from '../utils/date';
import { axsFetchExpenses } from '../utils/http';

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { expenses } = useAppSelector(state => state.expenses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await axsFetchExpenses();
        dispatch(setExpenses(expenses));
      } catch (err) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  const errorHandler = () => {
    setError(null);
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  if (error) {
    return <ErrorOverlay message={error} />
  }

  const recentExpenses = expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (expense.date > date7DaysAgo) && (expense.date <= today);
  });

  return (
    <ExpensesOutput expenses={recentExpenses} period="Last 7 Days" fallbackText='No recent registered expenses found!' />
  )
}

export default RecentExpenses