import { Picker } from 'emoji-mart';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { toggleEmojiDrawer } from '../store/actions/open-content';
import { ChatType, RootStateType } from '../types.d';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';

const ChatsBody = ({
  chats,
  sendMessage,
  saleManagerFirstname,
}: {
  chats: ChatType[];
  sendMessage?: (msg: string) => void;
  saleManagerFirstname?: string;
}) => {
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStateType) => state);
  const [message, setMessage] = useState<string>(EMPTY_STRING);
  const {
    openContent: { emojiDrawer: openEmojiTray },
  } = useSelector((state: RootStateType) => state);

  const scrollToBottom = () => {
    if (messagesEndRef) {
      (messagesEndRef.current! as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectEmoji = (emoji: any) => {
    setMessage((prevState) => `${prevState}${emoji.native}`);
    closeEmojiDrawer();
  };

  const closeEmojiDrawer = () => {
    if (openEmojiTray) {
      dispatch(toggleEmojiDrawer(false));
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className="chats-body">
      <div className="chat-messages" onClick={closeEmojiDrawer}>
        {chats.map((chat, index) => {
          const { from, message: msg, createdAt } = chat;
          return (
            <Fragment key={index}>
              <ChatMessage
                saleManagerFirstname={saleManagerFirstname}
                position={from === auth.id ? 'right' : 'left'}
                message={msg}
                createdAt={createdAt}
              />
            </Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <ChatForm sendMessage={sendMessage} message={message} setMessage={setMessage} />
        {openEmojiTray && (
          <Picker onSelect={selectEmoji} style={{ position: 'absolute', width: 500, bottom: 35 }} />
        )}
      </div>
    </div>
  );
};

export default ChatsBody;
