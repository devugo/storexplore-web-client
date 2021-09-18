import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import ChatsBody from '../../components/ChatsBody';
import ContentLoader from '../../components/ContentLoader';
import PageWrapper from '../../components/PageWrapper';
import { SERVER_BASE_URL } from '../../constants';
import { readChats } from '../../store/actions/chat';
import { READ_CHATS } from '../../store/actions/types';
import { ApiResponseType, RootStateType } from '../../types.d';
const socket = io(SERVER_BASE_URL);

const Chats = () => {
  const dispatch = useDispatch();
  const {
    auth,
    chats: { data: chats },
    loader: loaders,
  } = useSelector((state: RootStateType) => state);
  const storeuser = auth.saleManager?.store?.user;
  const store = auth.saleManager?.store;

  //  READ CHATS LOADERS
  const readProgressData = loaders.find(
    (x) => x.type === READ_CHATS.IN_PROGRESS
  ) as ApiResponseType;
  const readLoading = !!readProgressData;

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
    dispatch(readChats(`?other=${storeuser?.id}`));
  }, []);

  return (
    <PageWrapper pageTitle="Chats">
      <div className="chats-page">
        <div className="devugo-card">
          <div className="chats-page__title">
            <div className="profile">
              <img src={store?.logoPath} width="30" height="30" />
              <h3>ADMIN</h3>
            </div>
          </div>
          {readLoading ? <ContentLoader /> : <ChatsBody chats={chats} sendMessage={sendMessage} />}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Chats;
