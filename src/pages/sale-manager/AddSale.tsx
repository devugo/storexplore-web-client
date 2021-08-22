import PageWrapper from '../../components/PageWrapper';
import SaleForm from '../../components/SaleForm';
import { SaleType } from '../../types.d';

const AddSale = () => {
  const submit = (values: SaleType) => {
    console.log({ values });
  };
  return (
    <PageWrapper pageTitle="Add Sale">
      <div className="sale-manager__add-sale">
        <div className="devugo-card">
          <SaleForm submit={submit} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddSale;
