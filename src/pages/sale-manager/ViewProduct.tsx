import PageWrapper from '../../components/PageWrapper';
import ViewProductTemplate from '../../components/ViewProductTemplate';

const ViewProduct = () => {
  return (
    <PageWrapper pageTitle="View Product">
      <div className="sale-manager__view-product">
        <ViewProductTemplate />
      </div>
    </PageWrapper>
  );
};

export default ViewProduct;
