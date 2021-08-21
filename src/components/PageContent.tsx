import { FC } from 'react';

import Header from './Header';
import PageTitle from './PageTitle';

const PageContent = ({
  children,
  toggleSidebar,
  openSidebar,
  pageTitle,
}: {
  children: FC;
  toggleSidebar: () => void;
  openSidebar: boolean;
  pageTitle: string;
}) => {
  return (
    <div className="page-content">
      <Header toggleSidebar={toggleSidebar} openSidebar={openSidebar} />
      <div className="page-content__body">
        <PageTitle title={pageTitle} />
        {children}
      </div>
    </div>
  );
};

export default PageContent;
