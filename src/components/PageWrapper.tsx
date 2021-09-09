import { useState } from 'react';

import PageContent from './PageContent';
import Sidebar from './Sidebar';

const PageWrapper = (props: { pageTitle: string; children: any }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar((prevState) => !prevState);
  };

  const toggleProfile = () => {
    setOpenProfile((prevState) => !prevState);
  };

  const closeProfile = () => {
    if (openProfile) {
      setOpenProfile(false);
    }
  };

  return (
    <div className="page-wrapper" onClick={closeProfile}>
      <Sidebar openSidebar={openSidebar} />
      <PageContent
        pageTitle={props.pageTitle}
        openSidebar={openSidebar}
        toggleSidebar={toggleSidebar}
        toggleProfile={toggleProfile}
        openProfile={openProfile}
      >
        {props.children}
      </PageContent>
    </div>
  );
};

export default PageWrapper;
