import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { RootStackParamList } from '../App';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addExpense, updateExpense, deleteExpense } from '../redux/slices/expenses-slice';
import ExpenseForm, { InputPropsParsed } from '../components/ManageExpense/ExpenseForm';
import { axsDeleteExpense, axsStoreExpense, axsUpdateExpense } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

type ManageExpensesRouteParams = {
  expenseId: string;
}

type Props = {
  route: RouteProp<ParamListBase, 'ManageExpense'>;
  navigation: StackNavigationProp<RootStackParamList, 'ManageExpense'>;
}

const ManageExpenses = ({ route, navigation }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await axsDeleteExpense(editedExpenseId);
      dispatch(deleteExpense(editedExpenseId));
      navigation.goBack();
    } catch (err) {
      setError('Could not delete expense - please try again later!');
      setIsSubmitting(false);
    }
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const confirmHandler = async (expenseData: InputPropsParsed) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        dispatch(updateExpense({ id: editedExpenseId, expenseData }));
        axsUpdateExpense(editedExpenseId, expenseData);
      } else {
        const id = await axsStoreExpense(expenseData);
        dispatch(addExpense({ id, ...expenseData }));
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return <LoadingOverlay />
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />
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