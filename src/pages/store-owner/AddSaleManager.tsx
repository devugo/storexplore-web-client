import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageWrapper from '../../components/PageWrapper';
import SaleManagerForm from '../../components/SaleManagerForm';
import { createSaleManager } from '../../store/actions/sale-manager';
import { getMyStore } from '../../store/actions/store';
import { RootStateType, SaleManagerType } from '../../types.d';

const AddSaleManager = () => {
  const dispatch = useDispatch();
  const { store } = useSelector((state: RootStateType) => state);

  const submit = (values: SaleManagerType) => {
    dispatch(createSaleManager(values));
  };

  const getStore = () => {
    dispatch(getMyStore());
  };

  useEffect(() => {
    getStore();
  }, []);

  return (
    <PageWrapper pageTitle="Add Sale Manager">
      <div className="store-owner__add-sale-manager">
        <div className="devugo-card">
          <SaleManagerForm
            defaultPassword={store.data && store.data.defaultPassword}
            hidePhoto
            submit={submit}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddSaleManager;
