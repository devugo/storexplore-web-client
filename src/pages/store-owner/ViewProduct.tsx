import PageWrapper from '../../components/PageWrapper';
import ViewProductTemplate from '../../components/ViewProductTemplate';
import { USER_TYPE } from '../../constants/USER_TYPE';

const ViewProduct = () => {
  return (
    <PageWrapper pageTitle="View Product">
      <div className="store-owner__view-product">
        <ViewProductTemplate mode={USER_TYPE.storeOwner} />
      </div>
    </PageWrapper>
  );
};

export default ViewProduct;
