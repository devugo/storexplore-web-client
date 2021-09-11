import PageWrapper from '../../components/PageWrapper';
import SaleManagerForm from '../../components/SaleManagerForm';
import { SaleManagerType } from '../../types.d';

const EditSaleManager = () => {
  const submit = (values: SaleManagerType) => {
    console.log({ values });
  };
  return (
    <PageWrapper pageTitle="Edit Sale Manager">
      <div className="store-owner__edit-sale-manager">
        <div className="devugo-card">
          <SaleManagerForm submit={submit} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditSaleManager;
