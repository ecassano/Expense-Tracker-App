import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';

export type ScreenNames = ["AllExpenses", "RecentExpenses", "ExpensesOverview", "ManageExpense"];
export type RootStackParamList = Record<ScreenNames[number], any>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator();

export const ExpensesOveriew = () => (
  <BottomTab.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      tabBarInactiveTintColor: GlobalStyles.colors.primary100,
      headerRight: ({ tintColor }) => <IconButton icon='add' size={24} color={tintColor} onPress={() => navigation.navigate("ManageExpense")} />
    })}>
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
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white'
        }}>
          <Stack.Screen name='ExpensesOverview' component={ExpensesOveriew} options={{ headerShown: false }} />
          <Stack.Screen name='ManageExpense' component={ManageExpenses} options={{ presentation: 'modal' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
