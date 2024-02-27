import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import Input from './Input';
import Button from '../UI/Button';
import { Expense } from '../../redux/slices/expenses-slice';
import { getFormattedDate } from '../../utils/date';
import { GlobalStyles } from '../../constants/styles';

type TInputProp = {
  value: string;
  isValid: boolean;
}

type InputProps = {
  amount: TInputProp,
  date: TInputProp,
  description: TInputProp
};

export type InputPropsParsed = {
  amount: number;
  date: Date;
  description: string;
}

type Props = {
  submitButtonLabel: 'Add' | 'Update';
  defaultValues?: Expense;
  onCancel: () => void;
  onSubmit: (expenseData: InputPropsParsed) => void;
}

const ExpenseForm = ({ submitButtonLabel, defaultValues, onCancel, onSubmit }: Props) => {
  const [inputs, setInputs] = useState<InputProps>({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    }

  })

  const inputsChangeHandler = (inputIdentifier: string, enteredValue: string) => {
    setInputs(currentState => (
      {
        ...currentState,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      }
    ));
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== 'Invalid Date';
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      // Alert.alert('Invalid input', 'Please check your input values before submitting');
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: isAmountValid },
          date: { value: curInputs.date.value, isValid: isDateValid },
          description: { value: curInputs.description.value, isValid: isDescriptionValid },
        };
      })
      return
    }

    onSubmit(expenseData);
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputsChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value
          }} />
        <Input
          label='Date'
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputsChangeHandler.bind(this, 'date'),
            value: inputs.date.value
          }}
        />
      </View>
      <Input
        label='Description'
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: inputsChangeHandler.bind(this, 'description'),
          value: inputs.description.value
        }}
      />
      {formIsInvalid && (<Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>)}
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} mode='normal' onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
    </View >
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  form: {
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  }
})