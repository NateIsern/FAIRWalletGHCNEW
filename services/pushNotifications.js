import PushNotification from 'react-native-push-notification';

const configurePushNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};

const sendLocalNotification = (title, message) => {
  PushNotification.localNotification({
    title: title,
    message: message,
  });
};

const sendTransactionNotification = (transaction) => {
  const title = 'New Transaction';
  const message = `You received ${transaction.amount} BTC from ${transaction.sender}`;
  sendLocalNotification(title, message);
};

export { configurePushNotifications, sendLocalNotification, sendTransactionNotification };
