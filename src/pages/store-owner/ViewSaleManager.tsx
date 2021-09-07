import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageWrapper from '../../components/PageWrapper';
import ViewSaleManagerTemplate from '../../components/ViewSaleManagerTemplate';
import { RootStateType } from '../../types.d';

const ViewSaleManager = () => {
  const { id } = useParams<{ id: string }>();
  const { saleManagers } = useSelector((state: RootStateType) => state);

  const saleManager = saleManagers.data.find((x) => x.id === id);
  return (
    <PageWrapper pageTitle="View Sale Manager">
      <div className="store-owner__view-sale-manager">
        <ViewSaleManagerTemplate saleManager={saleManager} />
      </div>
    </PageWrapper>
  );
};

export default ViewSaleManager;
