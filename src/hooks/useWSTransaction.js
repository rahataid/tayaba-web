import { useEffect, useState } from 'react';
import { WSS_SERVER, WSS_EVENTS } from '@config';

const { useWebsocket } = require('./useWebsocket');

const useWSTransaction = () => {
  const websocket = useWebsocket(WSS_SERVER);
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    if (!websocket.current) return;
    websocket.current.onmessage = async (socketEvent) => {
      if (!socketEvent?.data) return;
      const { data } = socketEvent;
      const { action, ...rest } = JSON.parse(data || {});
      if (action !== WSS_EVENTS.rahat_claimed) return;
      const newTransaction = rest;
      setTransactions(newTransaction);
    };
  }, [websocket]);
  return [transactions, websocket];
};

export default useWSTransaction;
