import moment from 'moment';

import { DATE_FORMAT } from '../constants/DATE_FORMAT';

const ChatMessage = ({
  position,
  message,
  saleManagerFirstname,
  createdAt,
}: {
  position: string;
  message: string;
  saleManagerFirstname?: string;
  createdAt: Date;
}) => {
  return (
    <div className={`chat-message ${position}`}>
      <p className="chat-message__time-container">
        <span className="name">
          <b>
            {position === 'right' ? 'Me' : saleManagerFirstname ? saleManagerFirstname : 'Admin'}
          </b>
        </span>{' '}
        <span className="time">{moment(createdAt).format(DATE_FORMAT.chat)}</span>
      </p>
      <div className="chat-message__content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
