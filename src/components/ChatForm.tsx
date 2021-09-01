import { useState } from 'react';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import RenderIcon from './RenderIcon';

const ChatForm = ({ sendMessage }: { sendMessage?: (message: string) => void }) => {
  const [message, setMessage] = useState<string>(EMPTY_STRING);
  const forwardMessage = (e: any) => {
    e.preventDefault();
    setMessage(EMPTY_STRING);
    sendMessage && sendMessage(message);
  };

  const changeInput = (e: any) => {
    setMessage(e.target.value);
  };
  return (
    <div className="chat-form">
      <form onSubmit={forwardMessage}>
        <div className="chat-form__input">
          <input
            placeholder="Write message..."
            value={message}
            onChange={changeInput}
            className="devugo-input"
          />
          <div className="icon" onClick={forwardMessage}>
            <RenderIcon title="mdi mdi-message" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
