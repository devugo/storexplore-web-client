import { useState } from 'react';

import PageContent from './PageContent';
import Sidebar from './Sidebar';

const PageWrapper = (props: { pageTitle: string; children: any }) => {
  const [openSidebar, setOpenSidebar] = useState(true);

  const toggleSidebar = () => {
    setOpenSidebar((prevState) => !prevState);
  };
  return (
    <div className="page-wrapper">
      <Sidebar openSidebar={openSidebar} />
      <PageContent
        pageTitle={props.pageTitle}
        openSidebar={openSidebar}
        toggleSidebar={toggleSidebar}
      >
        {props.children}
      </PageContent>
    </div>
  );
};

export default PageWrapper;
