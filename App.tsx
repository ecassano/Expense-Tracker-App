import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export const ExpensesOveriew = () => (
  <BottomTab.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500
    }}>
    <BottomTab.Screen
      name='RecentExpenses'
      component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='hourglass' color={color} size={size} />
        )
      }}
    />
    <BottomTab.Screen
      name='AllExpenses'
      component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='calendar' color={color} size={size} />
        )
      }}
    />
  </BottomTab.Navigator>
);

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='ExpensesOverview' component={ExpensesOveriew} options={{ headerShown: false }} />
          <Stack.Screen name='ManageExpense' component={ManageExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
