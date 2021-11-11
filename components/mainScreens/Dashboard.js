import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text,Icon } from '@ui-kitten/components';
import Clients from '../subComponents/Clients';
const AlertIcon = (props) => (
    <Icon {...props} name='alert-triangle-outline'/>
  );
  
  const MessageIcon = (props) => (
    <Icon {...props} name='message-circle-outline'/>
  );

const { Navigator, Screen } = createBottomTabNavigator();

const Im = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>IM</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
   <BottomNavigationTab title='ALERTS' icon={AlertIcon}/>
   <BottomNavigationTab title='IM' icon={MessageIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator screenOptions={{
      headerShown:false
  }} tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Users' component={Clients}/>
    <Screen name='Orders' component={Im}/>
  </Navigator>
);

 const Dashboard = () => (
  <TabNavigator/>
);
export default Dashboard