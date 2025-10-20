import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function EmployeeForm({
  initialFullName = '',
  initialAge = '',
  initialOccupation = '',
  title = 'Employee Form',
  onUpdate,
}) {
  const [fullName, setFullName] = useState(initialFullName);
  const [age, setAge] = useState(initialAge);
  const [occupation, setOccupation] = useState(initialOccupation);
  const [message, setMessage] = useState('');

  const handleUpdate = () => {
    if (!fullName || !age || !occupation) {
      setMessage('Please fill out all fields!');
      return;
    }
    setMessage('Update success!');
    onUpdate?.({ fullName, age, occupation });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Occupation (specialized in training)"
        value={occupation}
        onChangeText={setOccupation}
      />

      <Button title="Update" onPress={handleUpdate} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  message: { marginTop: 8, color: 'green', fontWeight: 'bold' },
});
