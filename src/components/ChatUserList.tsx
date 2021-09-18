import { Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../constants/COLOR';
import { toggleChatList } from '../store/actions/open-content';
import { RootStateType, SaleManagerType } from '../types.d';
import RenderIcon from './RenderIcon';

const ChatUserList = ({
  saleManagers,
  setSaleManagerTo,
}: {
  saleManagers?: SaleManagerType[];
  setSaleManagerTo?: (saleManagerObj: any) => void;
}) => {
  const dispatch = useDispatch();
  const {
    openContent: { chatList: openChatList },
  } = useSelector((state: RootStateType) => state);

  const toggle = () => {
    dispatch(toggleChatList(!openChatList));
  };

  const switchUser = (saleManager: SaleManagerType) => {
    setSaleManagerTo && setSaleManagerTo(saleManager);
  };

  return (
    <div className="chat-user-list">
      <Tooltip title="Select sale manager" color={COLORS.primary}>
        <div className="chat-user-list__toggler" onClick={toggle}>
          <RenderIcon
            styles={{ color: COLORS.primary, fontSize: 20 }}
            title="mdi mdi-account-supervisor"
          />
        </div>
      </Tooltip>
      <div className={`chat-user-list__dropdown${openChatList ? ' open' : ''}`}>
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
