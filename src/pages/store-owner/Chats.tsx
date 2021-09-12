import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import ChatsBody from '../../components/ChatsBody';
import ChatUserList from '../../components/ChatUserList';
import ContentLoader from '../../components/ContentLoader';
import PageWrapper from '../../components/PageWrapper';
import { SERVER_BASE_URL } from '../../constants';
import { readChats } from '../../store/actions/chat';
import { readSaleManagers } from '../../store/actions/sale-manager';
import { READ_CHATS } from '../../store/actions/types';
import { ApiResponseType, RootStateType } from '../../types.d';
const socket = io(SERVER_BASE_URL);

const Chats = (props: any) => {
  console.log({ props: props.openChatList });
  const dispatch = useDispatch();
  const {
    saleManagers,
    auth,
    chats: { data: chats },
    loader: loaders,
  } = useSelector((state: RootStateType) => state);
  const [saleManagerTo, setSaleManagerTo] = useState<any>();

  //  READ CHATS LOADERS
  const readProgressData = loaders.find(
    (x) => x.type === READ_CHATS.IN_PROGRESS
  ) as ApiResponseType;
  const readLoading = !!readProgressData;

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
    if (saleManagerTo) {
      dispatch(readChats(`?other=${saleManagerTo.user.id}`));
    }
  }, [saleManagerTo]);

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
          {readLoading ? (
            <ContentLoader />
          ) : saleManagerTo ? (
            <ChatsBody chats={chats} sendMessage={sendMessage} />
          ) : null}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Chats;
