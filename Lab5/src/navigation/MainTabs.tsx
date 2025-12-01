// src/navigation/MainTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import HomeScreen from '../screens/HomeScreen';
import TransactionListScreen from '../screens/TransactionListScreen';
import CustomerListScreen from '../screens/CustomerListScreen';
import SettingScreen from '../screens/SettingScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Text>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionListScreen}
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: () => <Text>💰</Text>,
        }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerListScreen}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: () => <Text>👥</Text>,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: () => <Text>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
