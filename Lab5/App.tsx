// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';

import LoginScreen from './src/screens/LoginScreen';
import MainTabs from './src/navigation/MainTabs';

import AddServiceScreen from './src/screens/AddServiceScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';
import EditServiceScreen from './src/screens/EditServiceScreen';
import DeleteServiceScreen from './src/screens/DeleteServiceScreen';

import TransactionDetailScreen from './src/screens/TransactionDetailScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import DeleteTransactionScreen from './src/screens/DeleteTransactionScreen';

import AddCustomerScreen from './src/screens/AddCustomerScreen';
import CustomerDetailScreen from './src/screens/CustomerDetailScreen';
import EditCustomerScreen from './src/screens/EditCustomerScreen';
import DeleteCustomerScreen from './src/screens/DeleteCustomerScreen';
import CustomerListScreen from './src/screens/CustomerListScreen';
import TransactionListScreen from './src/screens/TransactionListScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        {/* Service stack screens */}
        <Stack.Screen
          name="AddService"
          component={AddServiceScreen}
          options={{ title: 'Service' }}
        />
        <Stack.Screen
          name="ServiceDetail"
          component={ServiceDetailScreen}
          options={{ title: 'Service detail' }}
        />
        <Stack.Screen
          name="EditService"
          component={EditServiceScreen}
          options={{ title: 'Service' }}
        />
        <Stack.Screen
          name="DeleteService"
          component={DeleteServiceScreen}
          options={{
            presentation: 'transparentModal',
            headerShown: false,
          }}
        />

        {/* Transaction stack screens */}
        {/* <Stack.Screen
          name="Transaction"
          component={TransactionListScreen}
          options={{ title: 'Transaction list' }}
        /> */}
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetailScreen}
          options={{ title: 'Transaction detail' }}
        />
        <Stack.Screen
          name="AddTransaction"
          component={AddTransactionScreen}
          options={{ title: 'Add transaction' }}
        />
        <Stack.Screen
          name="DeleteTransaction"
          component={DeleteTransactionScreen}
          options={{
            presentation: 'transparentModal',
            headerShown: false,
          }}
        />

        {/* Customer stack screens */}
        {/* <Stack.Screen
          name="Customer"
          component={CustomerListScreen}
          options={{ title: 'Customer list' }}
        /> */}
        <Stack.Screen
          name="AddCustomer"
          component={AddCustomerScreen}
          options={{ title: 'Add customer' }}
        />
        <Stack.Screen
          name="CustomerDetail"
          component={CustomerDetailScreen}
          options={{ title: 'Customer detail' }}
        />
        <Stack.Screen
          name="EditCustomer"
          component={EditCustomerScreen}
          options={{ title: 'Edit customer' }}
        />
        <Stack.Screen
          name="DeleteCustomer"
          component={DeleteCustomerScreen}
          options={{
            presentation: 'transparentModal',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
