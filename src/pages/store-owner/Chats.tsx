import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import ChatsBody from '../../components/ChatsBody';
import ChatUserList from '../../components/ChatUserList';
import PageWrapper from '../../components/PageWrapper';
import { addChat } from '../../store/actions/chat';
import { readSaleManagers } from '../../store/actions/sale-manager';
import { RootStateType } from '../../types.d';
const socket = io('http://localhost:4000');

const Chats = () => {
  const dispatch = useDispatch();
  const {
    saleManagers,
    auth,
    chats: { data: chats },
  } = useSelector((state: RootStateType) => state);
  const [saleManagerTo, setSaleManagerTo] = useState<any>();

  const sendMessage = (message: string) => {
    if (message) {
      socket.emit('chat message', {
        from: auth.id,
        to: saleManagerTo.user.id,
        message,
      });
    }
  };

  const getSaleManagers = () => {
    dispatch(readSaleManagers());
  };

  useEffect(() => {
    getSaleManagers();
  }, []);

  useEffect(() => {
    socket.on('chat message', (msgObj) => {
      if (msgObj.from === auth.id || msgObj.to === auth.id) {
        dispatch(addChat(msgObj));
      }
    });
  }, []);

  return (
    <PageWrapper pageTitle="Chats">
      <div className="store-owner__chats">
        <div className="devugo-card">
          <div className="store-owner__chats-title">
            <div className="profile" style={{ display: 'flex' }}>
              {saleManagerTo && saleManagerTo.photo && (
                <img
                  src={saleManagerTo.photo}
                  width="30"
                  height="30"
                  style={{ borderRadius: '50%', marginRight: 5 }}
                />
              )}
              {saleManagerTo && <h3>{`${saleManagerTo.firstname} ${saleManagerTo.lastname}`}</h3>}
            </div>
            <ChatUserList saleManagers={saleManagers.data} setSaleManagerTo={setSaleManagerTo} />
          </div>
          {saleManagerTo && <ChatsBody chats={chats} sendMessage={sendMessage} />}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Chats;
