import PageWrapper from '../../components/PageWrapper';
import ViewSaleManager from '../../components/ViewSaleManager';

const ViewSaleManagerPage = () => {
  return (
    <PageWrapper pageTitle="View Sale Manager">
      <div className="store-owner__view-sale-manager">
        <ViewSaleManager />
      </div>
    </PageWrapper>
  );
};

export default ViewSaleManagerPage;
