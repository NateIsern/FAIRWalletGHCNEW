import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionDetails = ({ transaction }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{transaction.date}</Text>
      <Text style={styles.amount}>{transaction.amount} BTC</Text>
      <Text style={styles.status}>{transaction.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
});

export default TransactionDetails;
