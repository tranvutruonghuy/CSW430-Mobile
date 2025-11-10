import 'react-native-gesture-handler';
import React from 'react';
import Contacts from './src/Contact';
import store from './src/Store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileContact from './src/ProfileContact.js';
import Favorites from './src/Favorites.js';
import { IconButton } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
function ContactsScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{ title: 'Contacts' }}
      />
      <Stack.Screen
        name="ProfileContacts"
        component={ProfileContact}
        options={{ title: 'Product contact' }}
      />
    </Stack.Navigator>
  );
}

function FavoritesScreen() {
  return (
    <Stack.Navigator
      initialRouteName="FavoritesStacks"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="FavoritesStacks"
        component={Favorites}
        options={{ title: 'FavoritesStack' }}
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: 'Profile contact' }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

// Icon components defined at module scope to avoid recreating components on every render
const ContactsTabIcon = ({ color, size }: any) => (
  <IconButton icon="account" size={size ?? 24} iconColor={color ?? '#666'} />
);

const FavoritesTabIcon = ({ color, size }: any) => (
  <IconButton icon="star" size={size ?? 24} iconColor={color ?? '#666'} />
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ tabBarIcon: ContactsTabIcon }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarIcon: FavoritesTabIcon }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
