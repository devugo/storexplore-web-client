import { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootStateType } from '../types.d';
import Header from './Header';
import PageTitle from './PageTitle';

const PageContent = ({
  children,
  toggleSidebar,
  pageTitle,
  toggleProfile,
}: {
  children: FC;
  toggleSidebar: () => void;
  pageTitle: string;
  toggleProfile: () => void;
}) => {
  const { openContent } = useSelector((state: RootStateType) => state);
  const openSidebar = openContent.sidebar;
  const openProfile = openContent.profile;

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
