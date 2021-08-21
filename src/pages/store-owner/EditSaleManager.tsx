import PageWrapper from '../../components/PageWrapper';
import SaleManagerForm from '../../components/SaleManagerForm';
// import { GENDER } from '../../constants/GENDER';
import { SaleManagerType } from '../../types.d';

const EditSaleManager = () => {
  const changePhoto = (e: any) => {
    console.log(e.target.files);
  };

  const submit = (values: SaleManagerType) => {
    console.log({ values });
  };
  return (
    <PageWrapper pageTitle="Edit Sale Manager">
      <div className="store-owner__edit-sale-manager">
        <div className="devugo-card">
          <SaleManagerForm changePhoto={changePhoto} submit={submit} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditSaleManager;
