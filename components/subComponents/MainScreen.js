import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Clients from './Clients';
import DispatchMobile from './Units/DispatchMobile';
import VirtualCouncellor from './Units/VirtualCouncellor';
import CallFirst from './Units/CallFirst';
import ContactClient from './Units/ContactClient';
import CallReferal from './Units/CallReferal';
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
        <Stack.Screen name="ContactClient" component={ContactClient} />
        <Stack.Screen name="CallRef" component={CallReferal} />
        {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      </Stack.Navigator>
    );
  }