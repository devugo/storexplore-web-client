import { FC } from 'react';

import Header from './Header';
import PageTitle from './PageTitle';

const PageContent = ({
  children,
  toggleSidebar,
  openSidebar,
}: {
  children: FC;
  toggleSidebar: () => void;
  openSidebar: boolean;
}) => {
  return (
    <div className="page-content">
      <Header toggleSidebar={toggleSidebar} openSidebar={openSidebar} />
      <div className="page-content__body">
        <PageTitle />
        {children}
      </div>
    </div>
  );
};

export default PageContent;
