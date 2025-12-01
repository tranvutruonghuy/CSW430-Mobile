// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';
import LoginScreen from './src/screens/LoginScreen';
import AddServiceScreen from './src/screens/AddServiceScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';
import EditServiceScreen from './src/screens/EditServiceScreen';
import DeleteServiceScreen from './src/screens/DeleteServiceScreen';
import TransactionDetailScreen from './src/screens/TransactionDetailScreen';
import AddCustomerScreen from './src/screens/AddCustomerScreen';
import MainTabs from './src/navigation/MainTabs';

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

        {/* Bottom tabs (Home, Transaction, Customer, Setting) */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        {/* Service modals / detail screens */}
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

        {/* Transaction detail */}
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetailScreen}
          options={{ title: 'Transaction detail' }}
        />

        {/* Add customer */}
        <Stack.Screen
          name="AddCustomer"
          component={AddCustomerScreen}
          options={{ title: 'Add customer' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
