import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { RootStackParamList } from '../App';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';

type ManageExpensesRouteParams = {
  expenseId: string;
}

type Props = {
  route: RouteProp<ParamListBase, 'ManageExpense'>;
  navigation: StackNavigationProp<RootStackParamList, 'ManageExpense'>;
}

const ManageExpenses = ({ route, navigation }: Props) => {
  const params = route.params as ManageExpensesRouteParams;
  const editedExpenseId = params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const confirmHandler = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.button} mode='normal' onPress={cancelHandler}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
})