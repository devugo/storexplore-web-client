import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import ChatsBody from '../../components/ChatsBody';
import ChatUserList from '../../components/ChatUserList';
import PageWrapper from '../../components/PageWrapper';
import { SERVER_BASE_URL } from '../../constants';
import { addChat } from '../../store/actions/chat';
import { RootStateType } from '../../types.d';
const socket = io(SERVER_BASE_URL);

const Chats = () => {
  const dispatch = useDispatch();
  const {
    auth,
    chats: { data: chats },
  } = useSelector((state: RootStateType) => state);
  const storeuser = auth.saleManager?.store?.user;

  const sendMessage = (message: string) => {
    if (message) {
      socket.emit('chat message', {
        from: auth.id,
        to: storeuser?.id,
        message,
      });
    }
  };

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
              <img
                src="https://devugo.com/index.png"
                width="30"
                height="30"
                style={{ borderRadius: '50%', marginRight: 5 }}
              />
              <h3>MIKE UGO</h3>
            </div>
            <ChatUserList />
          </div>
          <ChatsBody chats={chats} sendMessage={sendMessage} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Chats;
