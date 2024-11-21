import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en: {
    welcome: 'Welcome',
    balance: 'Balance',
    recentTransactions: 'Recent Transactions',
    sendBitcoin: 'Send Bitcoin',
    receiveBitcoin: 'Receive Bitcoin',
    transactions: 'Transactions',
    profile: 'Profile',
    copyAddress: 'Copy Address',
    transactionSuccessful: 'Transaction successful!',
    transactionFailed: 'Transaction failed: ',
    loading: 'Loading...',
  },
  es: {
    welcome: 'Bienvenido',
    balance: 'Saldo',
    recentTransactions: 'Transacciones Recientes',
    sendBitcoin: 'Enviar Bitcoin',
    receiveBitcoin: 'Recibir Bitcoin',
    transactions: 'Transacciones',
    profile: 'Perfil',
    copyAddress: 'Copiar Dirección',
    transactionSuccessful: '¡Transacción exitosa!',
    transactionFailed: 'Transacción fallida: ',
    loading: 'Cargando...',
  },
  // Add more languages here
};

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.fallbacks = true;
i18n.translations = translations;

// Allow RTL alignment for languages like Arabic
I18nManager.allowRTL(true);

export default i18n;
