import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageWrapper from '../../components/PageWrapper';
import ViewProductTemplate from '../../components/ViewProductTemplate';
import { USER_TYPE } from '../../constants/USER_TYPE';
import { RootStateType } from '../../types.d';

const ViewProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useSelector((state: RootStateType) => state);

  const product = products.data.find((x) => x.id === id);
  return (
    <PageWrapper pageTitle="View Product">
      <div className="sale-manager__view-product">
        <ViewProductTemplate mode={USER_TYPE.saleManager} product={product} />
      </div>
    </PageWrapper>
  );
};

export default ViewProduct;
