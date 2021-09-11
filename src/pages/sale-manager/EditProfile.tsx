import { useDispatch, useSelector } from 'react-redux';

import ChangePasswordForm from '../../components/ChangePasswordForm';
import PageWrapper from '../../components/PageWrapper';
import SaleManagerForm from '../../components/SaleManagerForm';
import { FORM_MODE } from '../../constants/FORM_MODE';
import { updateSaleManager } from '../../store/actions/sale-manager';
// import { GENDER } from '../../constants/GENDER';
import { RootStateType, SaleManagerType } from '../../types.d';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStateType) => state);

  const submit = (values: SaleManagerType) => {
    dispatch(updateSaleManager(values));
  };
  return (
    <PageWrapper pageTitle="Edit Profile">
      <div className="sale-manager__edit-profile">
        <div className="devugo-card">
          <SaleManagerForm
            data={auth.saleManager}
            submit={submit}
            mode={FORM_MODE.saleManagerEdit}
          />
        </div>

        <div className="devugo-card">
          <ChangePasswordForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditProfile;
