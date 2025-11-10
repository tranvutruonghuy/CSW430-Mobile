import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import ContactThum from './ContactThum.js';
import DetailListIt from './DetailListItem.js';
import { IconButton } from 'react-native-paper';

const ProfileContact = ({ route }) => {
  const { contact } = route.params;
  const { id, avatar, name, email, phone, cell } = contact;

  // Local state for favorite status
  const [isFavorite, setIsFavorite] = useState(contact.favorite);

  // Toggle favorite status
  const handleFavoritePress = () => {
    setIsFavorite(prevState => !prevState);
    // Additional logic for persisting the favorite status can be added here.
    Alert.alert(
      `${name} has been ${isFavorite ? 'removed from' : 'added to'} favorites.`,
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
