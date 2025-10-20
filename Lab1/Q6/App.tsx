import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import EmployeeForm from './components/EmployeeForm.js';
import SumFirstLastDigit from './components/SumFirstLastDigit.js';
import MinOfThree from './components/MinOfThree.js';
import Hailstone from './components/Hailstone.js';

export default function App() {
  return (
    <View style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ marginTop: 15 }}>Trần Vũ Trường Huy</Text>
        <EmployeeForm
          title="Employee Information (Props Demo)"
          initialFullName="Nguyen Van A"
          initialAge="30"
          initialOccupation="Training Specialist"
          onUpdate={data => console.log('Updated employee:', data)}
        />
        <SumFirstLastDigit />
        <MinOfThree />
        <Hailstone />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16, gap: 16 },
});
