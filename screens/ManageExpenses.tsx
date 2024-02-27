import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { RootStackParamList } from '../App';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addExpense, updateExpense, deleteExpense } from '../redux/slices/expenses-slice';
import ExpenseForm, { InputPropsParsed } from '../components/ManageExpense/ExpenseForm';

type ManageExpensesRouteParams = {
  expenseId: string;
}

type Props = {
  route: RouteProp<ParamListBase, 'ManageExpense'>;
  navigation: StackNavigationProp<RootStackParamList, 'ManageExpense'>;
}

const ManageExpenses = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();

  const params = route.params as ManageExpensesRouteParams;
  const editedExpenseId = params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = useAppSelector(state => state.expenses.expenses).find(expense => expense.id === editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    dispatch(deleteExpense(editedExpenseId));
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const confirmHandler = (expenseData: InputPropsParsed) => {
    if (isEditing) {
      dispatch(updateExpense({ id: editedExpenseId, expenseData }));
    } else {
      dispatch(addExpense(expenseData));
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm submitButtonLabel={isEditing ? 'Update' : 'Add'} defaultValues={selectedExpense} onSubmit={confirmHandler} onCancel={cancelHandler} />
      {isEditing &&
        <View style={styles.deleteContainer}>
          <IconButton icon='trash' color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
        </View>
      }
    </View>
  )
}

export default ManageExpenses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
})