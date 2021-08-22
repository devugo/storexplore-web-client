import PageWrapper from '../../components/PageWrapper';
import ViewSaleManagerTemplate from '../../components/ViewSaleManagerTemplate';

const ViewSaleManager = () => {
  return (
    <PageWrapper pageTitle="View Sale Manager">
      <div className="store-owner__view-sale-manager">
        <ViewSaleManagerTemplate />
      </div>
    </PageWrapper>
  );
};

export default ViewSaleManager;
