import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text,Icon } from '@ui-kitten/components';
import Clients from '../subComponents/Clients';
import MainScree from '../subComponents/MainScreen';
import Messaging from '../subComponents/Messages/Messaging';
import MyProfile from '../subComponents/Profile/MyProfile';
const AlertIcon = (props) => (
    <Icon {...props} name='alert-triangle-outline'/>
  );
  
  const MessageIcon = (props) => (
    <Icon {...props} name='message-circle-outline'/>
  );

  const ProfileIcon = (props) => (
    <Icon {...props} name='person-outline'/>
  );

const { Navigator, Screen } = createBottomTabNavigator();



const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
   <BottomNavigationTab title='ALERTS' icon={AlertIcon}/>
   <BottomNavigationTab title='IM' icon={MessageIcon}/>
   <BottomNavigationTab title='PROFILE' icon={ProfileIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator screenOptions={{
      headerShown:false
  }} tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Alerts' component={MainScree}/>
    <Screen name='Im' component={Messaging}/>
    <Screen name='Profile' component={MyProfile}/>
  </Navigator>
);

 const Dashboard = () => (
  <TabNavigator/>
);
export default Dashboard