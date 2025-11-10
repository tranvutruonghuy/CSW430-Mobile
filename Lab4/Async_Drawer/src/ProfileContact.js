import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useContext } from 'react';
import { ContactsContext } from './ContactsProvider';
import ContactThum from './ContactThum.js';
import DetailListIt from './DetailListItem.js';
import { IconButton } from 'react-native-paper';

const ProfileContact = ({ route }) => {
  const { contact } = route.params;
  const { getById, toggleFavorite } = useContext(ContactsContext);
  const current = getById(contact.id) || contact;
  const { id, avatar, name, email, phone, cell, favorite } = current;

  const handleFavoritePress = async () => {
    const updated = await toggleFavorite(id);
    const wasFavorite = updated ? updated.favorite : !favorite;
    Alert.alert(
      `${name} has been ${
        wasFavorite ? 'added to' : 'removed from'
      } favorites.`,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThum avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        <DetailListIt icon="email" title="Email" subtitle={email} />
        <DetailListIt icon="phone" title="Work" subtitle={phone} />
        <DetailListIt icon="cellphone" title="Personal" subtitle={cell} />
        <View style={styles.iconButtonContainer}>
          <IconButton
            icon={isFavorite ? 'star-check' : 'star-check-outline'}
            iconColor="#663399"
            size={20}
            onPress={handleFavoritePress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ProfileContact;
