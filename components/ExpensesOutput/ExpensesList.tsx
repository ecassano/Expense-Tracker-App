import { StyleSheet, FlatList, Text, ListRenderItem } from 'react-native'
import ExpenseItem from './ExpenseItem';
import { Expense } from './ExpensesOutput'

type Props = {
  expenses: Expense[];
}

const renderExpenseItem: ListRenderItem<Expense> = (itemData) => (
  <ExpenseItem {...itemData.item} />
)

const ExpensesList = ({ expenses }: Props) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={item => item.id} />
  )
}

export default ExpensesList

const styles = StyleSheet.create({})