import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const DetailListIt = ({ icon, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <IconButton icon={icon} size={24} iconColor="black" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  icon: {
    margin: 0,
    padding: 0,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default DetailListIt;
