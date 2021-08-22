import PageWrapper from '../../components/PageWrapper';
import SaleManagerForm from '../../components/SaleManagerForm';
// import { GENDER } from '../../constants/GENDER';
import { SaleManagerType } from '../../types.d';

const EditProfile = () => {
  const changeImage = (e: any) => {
    console.log(e.target.files);
  };

  const submit = (values: SaleManagerType) => {
    console.log({ values });
  };
  return (
    <PageWrapper pageTitle="Edit Profile">
      <div className="sale-manager__edit-profile">
        <div className="devugo-card">
          <SaleManagerForm changeImage={changeImage} submit={submit} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditProfile;
