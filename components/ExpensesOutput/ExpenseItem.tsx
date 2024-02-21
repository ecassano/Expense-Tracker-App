import { StyleSheet, Pressable, View, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { Expense } from './ExpensesOutput';
import { getFormattedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../App';

const ExpenseItem = ({ id, description, amount, date }: Expense) => {
  const navigation = useNavigation<StackNavigation>();

  const expensePressHandler = () => {
    navigation.navigate("ManageExpense", {
      expenseId: id
    });
  }

  return (
    <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.item}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    elevation: 3,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: GlobalStyles.colors.gray500,
    shadowOpacity: .5
  },
  textBase: {
    color: GlobalStyles.colors.primary100
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 70
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold'
  },
  pressed: {
    opacity: .75
  }
})