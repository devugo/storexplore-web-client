import React, { useState } from 'react';

import PageContent from './PageContent';
import Sidebar from './Sidebar';

const PageWrapper = (props: { pageTitle: string; children: any }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const [openChatList, setOpenChatList] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar((prevState) => !prevState);
  };

  const toggleProfile = () => {
    setOpenProfile((prevState) => !prevState);
  };

  // const toggleChatList = () => {
  //   setOpenChatList((prevState) => !prevState);
  // };

  const closeDropdowns = () => {
    if (openProfile) {
      setOpenProfile(false);
    }

    if (openChatList) {
      setOpenChatList(false);
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
      <Sidebar openSidebar={openSidebar} />
      <PageContent
        pageTitle={props.pageTitle}
        openSidebar={openSidebar}
        toggleSidebar={toggleSidebar}
        toggleProfile={toggleProfile}
        openProfile={openProfile}
      >
        {props.children}
        {/* {childrenWithProps} */}
      </PageContent>
    </div>
  );
};

export default PageWrapper;
