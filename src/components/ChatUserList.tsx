import { Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../constants/COLOR';
import { toggleChatList } from '../store/actions/open-content';
import { ChatType, RootStateType, SaleManagerType } from '../types.d';
import RenderIcon from './RenderIcon';

const getUnreadChatCount = (chats: ChatType[], userId: string): number => {
  return chats.filter((x) => x.from === userId && x.new).length;
};

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
    chats,
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
              const unreaChats = getUnreadChatCount(chats.data, saleManager?.user?.id as string);
              return (
                <div className="user" key={index} onClick={() => switchUser(saleManager)}>
                  <p>{`${saleManager.firstname} ${saleManager.lastname}`}</p>
                  {unreaChats > 0 && <span className="user__chat-count">{unreaChats}</span>}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ChatUserList;
