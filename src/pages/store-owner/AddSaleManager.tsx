import PageWrapper from '../../components/PageWrapper';
import SaleManagerForm from '../../components/SaleManagerForm';
import { SaleManagerType } from '../../types.d';

const AddSaleManager = () => {
  const changeImage = (e: any) => {
    console.log(e.target.files);
  };

  const submit = (values: SaleManagerType) => {
    console.log({ values });
  };
  return (
    <PageWrapper pageTitle="Add Sale Manager">
      <div className="store-owner__add-sale-manager">
        <div className="devugo-card">
          <SaleManagerForm submit={submit} changeImage={changeImage} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddSaleManager;
