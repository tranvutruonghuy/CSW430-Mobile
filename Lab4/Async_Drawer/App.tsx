import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import Contacts from './src/Contact';
import ContactsProvider from './src/ContactsProvider.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileContact from './src/ProfileContact.js';
import Favorites from './src/Favorites.js';
import { IconButton } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

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

const Drawer = createDrawerNavigator();

// small icon components
const ContactsIcon = ({ color, size }: any) => (
  <IconButton icon="account" size={size ?? 24} iconColor={color ?? '#666'} />
);

const FavoritesIcon = ({ color, size }: any) => (
  <IconButton icon="star" size={size ?? 24} iconColor={color ?? '#666'} />
);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Contacts">
      <Drawer.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ drawerIcon: ContactsIcon }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ drawerIcon: FavoritesIcon }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <ContactsProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </ContactsProvider>
  );
};
export default App;
