import React from 'react';
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

  // const childrenWithProps = React.Children.map(props.children, (child) => {
  //   // console.log({ child });
  //   // Checking isValidElement is the safe way and avoids a typescript
  //   // error too.
  //   // if (React.isValidElement(child)) {
  //   const cloneElement = React.cloneElement(child, { toggleChatList, openChatList });
  //   console.log({ cloneElement });
  //   return cloneElement;
  //   // }
  //   // return child;
  // });

  // let elements = React.Children.toArray(props.children) as any;
  // console.log(elements.length);

  // if (elements.length === 1) {
  //   elements = React.cloneElement(elements[0], { toggleChatList, openChatList });
  // } else if (elements.length > 0) {
  //   const lastElement = elements[elements.length - 1];
  //   elements = [React.cloneElement(elements[0], { toggleChatList, openChatList })]
  //     .concat(elements.slice(1, -1))
  //     .concat(React.cloneElement(lastElement, { toggleChatList, openChatList }));
  // }

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
        {/* {childrenWithProps} */}
      </PageContent>
    </div>
  );
};

export default PageWrapper;
