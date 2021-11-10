import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import Dashboard from './components/mainScreens/Dashboard';
import Login from './components/mainScreens/Login';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}
function App() {
  return(
    <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
     <MyStack></MyStack>
    </NavigationContainer>
    </ApplicationProvider>
  )
}
export default App;