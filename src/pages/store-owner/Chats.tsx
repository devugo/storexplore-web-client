import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import ChatsBody from '../../components/ChatsBody';
import ChatUserList from '../../components/ChatUserList';
import ContentLoader from '../../components/ContentLoader';
import PageWrapper from '../../components/PageWrapper';
import { SERVER_BASE_URL } from '../../constants';
import { markSaleManagerChatsAsRead, readChats } from '../../store/actions/chat';
import { readSaleManagers } from '../../store/actions/sale-manager';
import { READ_CHATS } from '../../store/actions/types';
import { ApiResponseType, RootStateType } from '../../types.d';
const socket = io(SERVER_BASE_URL);

const Chats = () => {
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

  const markChatsAsRead = (userId: string) => {
    dispatch(markSaleManagerChatsAsRead(userId));
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
      markChatsAsRead(saleManagerTo.user.id);
    }
  }, [saleManagerTo]);

  const saleManagerName = saleManagerTo && `${saleManagerTo.firstname} ${saleManagerTo.lastname}`;
  const saleManagerFirstname = saleManagerTo && saleManagerTo.firstname;

  return (
    <PageWrapper pageTitle="Chats">
      <div className="chats-page">
        <div className="devugo-card">
          <div className="chats-page__title">
            {saleManagerTo ? (
              <div className="profile">
                {saleManagerTo.photo && <img src={saleManagerTo.photo} width="30" height="30" />}
                {<h3>{saleManagerName}</h3>}
              </div>
            ) : (
              <div>Select a user </div>
            )}

            <ChatUserList saleManagers={saleManagers.data} setSaleManagerTo={setSaleManagerTo} />
          </div>
          {readLoading ? (
            <ContentLoader />
          ) : saleManagerTo ? (
            <ChatsBody
              saleManagerFirstname={saleManagerFirstname}
              chats={chats}
              sendMessage={sendMessage}
            />
          ) : null}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Chats;
