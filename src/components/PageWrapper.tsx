import { useDispatch, useSelector } from 'react-redux';

import { toggleChatList, toggleProfile, toggleSidebar } from '../store/actions/open-content';
import { RootStateType } from '../types.d';
import ForwardSocketMessage from './ForwardSocketMessage';
import PageContent from './PageContent';
import Sidebar from './Sidebar';

const PageWrapper = (props: { pageTitle: string; children: any }) => {
  const {
    openContent: { sidebar: ooenSidebar, profile: openProfile, chatList: openChatList },
  } = useSelector((state: RootStateType) => state);
  const dispatch = useDispatch();

  const toggleSidebarMenu = () => {
    dispatch(toggleSidebar(!ooenSidebar));
  };

  const toggleProfileDropdown = () => {
    dispatch(toggleProfile(!openProfile));
  };

  const closeDropdowns = () => {
    if (openProfile) {
      dispatch(toggleProfile(false));
    }

    if (openChatList) {
      dispatch(toggleChatList(false));
    }
  };

  return (
    <div className="page-wrapper" onClick={closeDropdowns}>
      <ForwardSocketMessage />
      <Sidebar />
      <PageContent
        pageTitle={props.pageTitle}
        toggleSidebar={toggleSidebarMenu}
        toggleProfile={toggleProfileDropdown}
      >
        {props.children}
      </PageContent>
    </div>
  );
};

export default PageWrapper;
