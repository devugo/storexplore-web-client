import { useState } from 'react';

import { COLORS } from '../constants/COLOR';
import { SaleManagerType } from '../types.d';
import RenderIcon from './RenderIcon';

const ChatUserList = ({
  saleManagers,
  setSaleManagerTo,
}: {
  saleManagers?: SaleManagerType[];
  setSaleManagerTo?: (saleManagerObj: any) => void;
}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  const switchUser = (saleManager: SaleManagerType) => {
    setOpen(false);
    setSaleManagerTo && setSaleManagerTo(saleManager);
  };

  return (
    <div className="chat-user-list">
      <div className="chat-user-list__toggler" onClick={toggle}>
        <RenderIcon
          styles={{ color: COLORS.primary, fontSize: 20 }}
          title="mdi mdi-account-supervisor"
        />
      </div>
      <div className={`chat-user-list__dropdown${open ? ' open' : ''}`}>
        <div className="users">
          {saleManagers &&
            saleManagers.map((saleManager, index) => {
              return (
                <div className="user" key={index} onClick={() => switchUser(saleManager)}>
                  <p>{`${saleManager.firstname} ${saleManager.lastname}`}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ChatUserList;
