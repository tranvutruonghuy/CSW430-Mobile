import React from 'react';
import { ScrollView, Text } from 'react-native';
import data from './Data';
import Square from './Square';
import styles from './style';

const App = () => {
  return (
    
    <ScrollView style={styles.container}>
      <Text style={{ textAlign: 'center' }}>Trần Vũ Trường Huy</Text>
      {data.map((item, index) => (
        <Square key={item} text={`Square ${index + 1}`} />
      ))}
    </ScrollView>
  );
};

export default App;
