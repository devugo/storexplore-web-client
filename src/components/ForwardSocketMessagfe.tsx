import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { SERVER_BASE_URL } from '../constants';
import { addChat } from '../store/actions/chat';
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
  }, []);
  return <></>;
};

export default ForwardSocketMessage;
