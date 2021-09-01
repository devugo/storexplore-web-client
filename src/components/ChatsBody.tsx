import { Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { ChatType, RootStateType } from '../types.d';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';

const ChatsBody = ({
  chats,
  sendMessage,
}: {
  chats: ChatType[];
  sendMessage?: (message: string) => void;
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
          const { from, message } = chat;
          return (
            <Fragment key={index}>
              <ChatMessage position={from === auth.id ? 'right' : 'left'} message={message} />
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
