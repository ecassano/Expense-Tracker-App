import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from './Button';
import { GlobalStyles } from '../../constants/styles';

type Props = {
  message: string;
}

const ErrorOverlay = ({ message }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button mode='normal' onPress={() => console.log('Error')}>Okay</Button>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  message: {
    fontSize: 14
  }
})