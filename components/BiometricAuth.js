import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const BiometricAuth = ({ onAuthenticated }) => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };

    checkBiometricSupport();
  }, []);

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      setIsAuthenticated(true);
      onAuthenticated();
    } else {
      alert('Authentication failed');
    }
  };

  return (
    <View style={styles.container}>
      {isBiometricSupported ? (
        isAuthenticated ? (
          <Text style={styles.text}>Authenticated</Text>
        ) : (
          <Button title="Authenticate" onPress={handleBiometricAuth} />
        )
      ) : (
        <Text style={styles.text}>Biometric authentication is not supported on this device</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default BiometricAuth;
