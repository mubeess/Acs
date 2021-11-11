import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Clients from './Clients';
const Stack = createStackNavigator();
function MyStack() {
    return (
      <Stack.Navigator screenOptions={
        {
          headerShown:false
        }
      } initialRouteName='Main'>
        <Stack.Screen name="Main" component={Clients} />
        {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      </Stack.Navigator>
    );
  }

  export default function MainScree(props) {
      return(
          <MyStack></MyStack>
      )
  }