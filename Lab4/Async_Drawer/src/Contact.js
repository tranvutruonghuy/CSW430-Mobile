import React, { useContext } from 'react';
import { ContactsContext } from './ContactsProvider';
import { FlatList, StyleSheet, View } from 'react-native';
import ContactListItem from './ContactListItem.js';

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {
  const { contacts } = useContext(ContactsContext);

  const renderContacts = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() =>
          navigation.navigate('ProfileContacts', { contact: item })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={keyExtractor}
        renderItem={renderContacts}
      />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
