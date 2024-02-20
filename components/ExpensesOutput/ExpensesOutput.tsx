import { StyleSheet, View } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { DUMMY_EXPENSES } from '../../data/expenses';
import { GlobalStyles } from '../../constants/styles';

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

type Props = {
  expenses: Expense[];
  period: string;
}

const ExpensesOutput = ({ expenses, period }: Props) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} period={period} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700
  }
})