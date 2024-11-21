import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateBalance, updateTransactions } from '../redux/actions';

const useWebSocket = (url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'balanceUpdate') {
        dispatch(updateBalance(data.balance));
      } else if (data.type === 'transactionUpdate') {
        dispatch(updateTransactions(data.transactions));
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, [url, dispatch]);
};

export default useWebSocket;
