import PageWrapper from '../../components/PageWrapper';
import ViewSaleManagerTemplate from '../../components/ViewSaleManagerTemplate';

const Profile = () => {
  return (
    <PageWrapper pageTitle="View Profile">
      <div className="sale-manager__profile">
        <ViewSaleManagerTemplate />
      </div>
    </PageWrapper>
  );
};

export default Profile;
