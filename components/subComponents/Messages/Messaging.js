import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import StaffList from './StaffList';

const Stack = createStackNavigator();


  export default function Messaging(props) {
    return (
      <Stack.Navigator screenOptions={
        {
          headerShown:false
        }
      } initialRouteName='StaffList'>
        <Stack.Screen name="StaffList" component={StaffList} />
    
      </Stack.Navigator>
    );
  }