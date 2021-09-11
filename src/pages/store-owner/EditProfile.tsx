import { useSelector } from 'react-redux';

import ChangePasswordForm from '../../components/ChangePasswordForm';
import PageWrapper from '../../components/PageWrapper';
import StoreOwnerForm from '../../components/StoreOwnerForm';
import { RootStateType, StoreOwnerType } from '../../types.d';

const EditProfile = () => {
  const { auth } = useSelector((state: RootStateType) => state);

  return (
    <PageWrapper pageTitle="Edit Profile">
      <div className="sale-manager__edit-profile">
        <div className="devugo-card">
          <StoreOwnerForm data={auth.storeOwner as StoreOwnerType} />
        </div>

        <div className="devugo-card">
          <ChangePasswordForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditProfile;
