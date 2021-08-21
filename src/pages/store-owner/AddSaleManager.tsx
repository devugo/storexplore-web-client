import PageWrapper from '../../components/PageWrapper';
import SaleManagerForm from '../../components/SaleManagerForm';
import { SaleManagerType } from '../../types.d';

const AddSaleManager = () => {
  const changePhoto = (e: any) => {
    console.log(e.target.files);
  };

  const submit = (values: SaleManagerType) => {
    console.log({ values });
  };
  return (
    <PageWrapper pageTitle="Add Sale Manager">
      <div className="store-owner__add-sale-manager">
        <div className="devugo-card">
          <SaleManagerForm submit={submit} changePhoto={changePhoto} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddSaleManager;
