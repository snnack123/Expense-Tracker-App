import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import IconButton from './components/ui/IconButton';
import { GlobalStyles } from './constants/styles';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return <BottomTabs.Navigator screenOptions={({ navigation }) => ({
    headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
    headerTintColor: 'white',
    tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: () => <IconButton icon="add" size={24} color='white' onPress={() => navigation.navigate('ManageExpense')} />
  })}>
    <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
      title: 'Recent Expenses',
      tabBarLabel: 'Recent',
      tabBarIcon: ({color, size}) => <Ionicons name="hourglass" color={color} size={size} />
    }} />
    <BottomTabs.Screen name="AllExpenses" component={AllExpenses} options={{
      title: 'All Expenses',
      tabBarLabel: 'All Expenses',
      tabBarIcon: ({color, size}) => <Ionicons name="calendar" color={color} size={size} />
    }} />
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white'
          }}>
            <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{ headerShown: false }} />
            <Stack.Screen name="ManageExpense" component={ManageExpense} options={{
              presentation: 'modal',
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
