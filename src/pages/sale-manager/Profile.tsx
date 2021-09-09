import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageWrapper from '../../components/PageWrapper';
import ViewSaleManagerTemplate from '../../components/ViewSaleManagerTemplate';
import { readSaleManager } from '../../store/actions/sale-manager';
import { RootStateType } from '../../types.d';

const Profile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStateType) => state);
  const getProfile = () => {
    dispatch(readSaleManager(auth?.saleManager?.id as string));
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <PageWrapper pageTitle="View Profile">
      <div className="sale-manager__profile">
        <ViewSaleManagerTemplate saleManager={auth.saleManager} showEditButton />
      </div>
    </PageWrapper>
  );
};

export default Profile;
