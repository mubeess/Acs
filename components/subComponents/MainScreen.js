import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Clients from './Clients';
import DispatchMobile from './Units/DispatchMobile';
import VirtualCouncellor from './Units/VirtualCouncellor';
import CallFirst from './Units/CallFirst';
const Stack = createStackNavigator();
function MyStackk() {
    return (
      <Stack.Navigator screenOptions={
        {
          headerShown:false
        }
      } initialRouteName='Main'>
        <Stack.Screen name="Main" component={Clients} />
        <Stack.Screen name="Mobile" component={DispatchMobile} />
        {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      </Stack.Navigator>
    );
  }

  export default function MainScree(props) {
    return (
      <Stack.Navigator screenOptions={
        {
          headerShown:false
        }
      } initialRouteName='Main'>
        <Stack.Screen name="Main" component={Clients} />
        <Stack.Screen name="Mobile" component={DispatchMobile} />
        <Stack.Screen name="Virtual" component={VirtualCouncellor} />
        <Stack.Screen name="CallFirst" component={CallFirst} />
        {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      </Stack.Navigator>
    );
  }