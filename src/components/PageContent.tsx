import { FC } from 'react';

import Header from './Header';
import PageTitle from './PageTitle';

const PageContent = ({
  children,
  toggleSidebar,
  openSidebar,
  pageTitle,
  toggleProfile,
  openProfile,
}: {
  children: FC;
  toggleSidebar: () => void;
  openSidebar: boolean;
  pageTitle: string;
  toggleProfile: () => void;
  openProfile: boolean;
}) => {
  return (
    <div className={`page-content${openSidebar ? ' open-sidebar' : ''}`}>
      <Header
        toggleSidebar={toggleSidebar}
        openSidebar={openSidebar}
        toggleProfile={toggleProfile}
        openProfile={openProfile}
      />
      <div className="page-content__body">
        <PageTitle title={pageTitle} />
        {children}
      </div>
    </div>
  );
};

export default PageContent;
