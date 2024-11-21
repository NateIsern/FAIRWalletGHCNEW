import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getWalletBalance, getRecentTransactions } from '../utils/bitcoin';

const HomeScreen = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletBalance = await getWalletBalance();
        const recentTransactions = await getRecentTransactions();
        setBalance(walletBalance);
        setTransactions(recentTransactions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderTransaction = ({ item }) => (
    <View style={styles.transaction}>
      <Text>Date: {item.date}</Text>
      <Text>Amount: {item.amount}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Balance: {balance} BTC</Text>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transaction: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
