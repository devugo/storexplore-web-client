import { Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { ChatType, RootStateType } from '../types.d';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';

const ChatsBody = ({
  chats,
  sendMessage,
  saleManagerFirstname,
}: {
  chats: ChatType[];
  sendMessage?: (message: string) => void;
  saleManagerFirstname?: string;
}) => {
  const messagesEndRef = useRef(null);
  const { auth } = useSelector((state: RootStateType) => state);

  const scrollToBottom = () => {
    if (messagesEndRef) {
      (messagesEndRef.current! as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className="chats-body">
      <div className="chat-messages">
        {chats.map((chat, index) => {
          const { from, message, createdAt } = chat;
          return (
            <Fragment key={index}>
              <ChatMessage
                saleManagerFirstname={saleManagerFirstname}
                position={from === auth.id ? 'right' : 'left'}
                message={message}
                createdAt={createdAt}
              />
            </Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <ChatForm sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatsBody;
