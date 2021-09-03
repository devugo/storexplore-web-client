import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { SERVER_BASE_URL } from '../constants';
import { MESSAGE_TIME } from '../constants/MESSAGE_TIME';
import { showMessage } from '../helpers/functions/showMessage';
import { addChat } from '../store/actions/chat';
import { addSale } from '../store/actions/sale';
import { RootStateType } from '../types.d';
const socket = io(SERVER_BASE_URL);

const ForwardSocketMessage = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStateType) => state);

  useEffect(() => {
    socket.on('chat message', (msgObj) => {
      if (msgObj.from === auth.id || msgObj.to === auth.id) {
        dispatch(addChat(msgObj));
      }
    });

    socket.on('add sale', (msgObj) => {
      if (msgObj.from === auth.id) {
        if (msgObj.sale) {
          dispatch(addSale(msgObj.sale));
          showMessage('success', 'Sale added', MESSAGE_TIME);
        } else {
          showMessage('error', msgObj.error, MESSAGE_TIME);
        }
      }
    });
  }, []);
  return <></>;
};

export default ForwardSocketMessage;
