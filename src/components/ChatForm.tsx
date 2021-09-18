import { useDispatch } from 'react-redux';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { toggleEmojiDrawer } from '../store/actions/open-content';
import RenderIcon from './RenderIcon';

const ChatForm = ({
  message,
  setMessage,
  sendMessage,
}: {
  message: string;
  setMessage: (message: string) => void;
  sendMessage?: (message: string) => void;
}) => {
  const dispatch = useDispatch();
  const forwardMessage = (e: any) => {
    e.preventDefault();
    setMessage(EMPTY_STRING);
    sendMessage && sendMessage(message);
  };

  const changeInput = (e: any) => {
    setMessage(e.target.value);
  };

  const openEmojiDrawerHandler = () => {
    dispatch(toggleEmojiDrawer(true));
  };

  const closeEmojiDrawerHandler = () => {
    dispatch(toggleEmojiDrawer(false));
  };

  return (
    <div className="chat-form">
      <form onSubmit={forwardMessage} onClick={closeEmojiDrawerHandler}>
        <div className="chat-form__input">
          <input
            placeholder="Write a message..."
            value={message}
            onChange={changeInput}
            className="devugo-input"
          />
          <div className="icon" onClick={forwardMessage}>
            <RenderIcon title="mdi mdi-send" />
          </div>
        </div>
      </form>
      <p className="toggle-emoji__btn" onClick={openEmojiDrawerHandler}>
        &#128512;
      </p>
    </div>
  );
};

export default ChatForm;
