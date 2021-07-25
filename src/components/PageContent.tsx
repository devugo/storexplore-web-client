import { FC } from 'react';

import Header from './Header';

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
      {children}
    </div>
  );
};

export default PageContent;
