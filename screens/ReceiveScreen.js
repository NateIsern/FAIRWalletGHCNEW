import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { getWalletAddress } from '../utils/bitcoin';

const ReceiveScreen = () => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchAddress = async () => {
      const walletAddress = await getWalletAddress();
      setAddress(walletAddress);
    };

    fetchAddress();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receive Bitcoin</Text>
      {address ? (
        <>
          <QRCode value={address} size={200} />
          <Text style={styles.address}>{address}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button title="Copy Address" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  address: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ReceiveScreen;
