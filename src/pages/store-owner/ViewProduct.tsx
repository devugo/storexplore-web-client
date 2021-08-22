import PageWrapper from '../../components/PageWrapper';
import ViewProductTemplate from '../../components/ViewProductTemplate';

const ViewProduct = () => {
  return (
    <PageWrapper pageTitle="View Product">
      <div className="store-owner__view-product">
        <ViewProductTemplate />
      </div>
    </PageWrapper>
  );
};

export default ViewProduct;
