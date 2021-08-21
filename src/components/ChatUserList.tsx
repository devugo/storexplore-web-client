import { useState } from 'react';

import RenderIcon from './RenderIcon';

const ChatUserList = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="chat-user-list">
      <div className="chat-user-list__toggler" onClick={toggle}>
        <RenderIcon styles={{ color: 'green', fontSize: 20 }} title="mdi mdi-plus" />
      </div>
      <div className={`chat-user-list__dropdown${open ? ' open' : ''}`}>
        <div className="users">
          <div className="user">
            <p>Ugo Eze</p>
          </div>
          <div className="user">
            <p>Ugo Eze</p>
          </div>
          <div className="user">
            <p>Ugo Eze</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUserList;
