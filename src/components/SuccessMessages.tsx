import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getLoader } from '../helpers/functions/getLoader';
import { successCreation, successUpdate } from '../helpers/functions/responseChecker';
import { showMessage } from '../helpers/functions/showMessage';
import { CREATE_SALE_MANAGER, UPDATE_STORE, UPDATE_STORE_LOGO } from '../store/actions/types';
import { RootStateType } from '../types.d';

const SuccessMessages = () => {
  const { loader } = useSelector((state: RootStateType) => state);

  // UPDATE STORE Loader
  const { successData: updateStoreSuccessData } = getLoader(loader, UPDATE_STORE);
  const isStoreUpdated = successUpdate(updateStoreSuccessData);

  // UPDATE STORE  LOGO Loader
  const { successData: updateStoreLogoSuccessData } = getLoader(loader, UPDATE_STORE_LOGO);
  const isStoreLogoUpdated = successUpdate(updateStoreLogoSuccessData);

  // CREATE SALE MANAGER Loader
  const { successData: createSaleManagerSuccessData } = getLoader(loader, CREATE_SALE_MANAGER);
  const isSaleManagerCreated = successCreation(createSaleManagerSuccessData);

  useEffect(() => {
    if (isStoreUpdated) {
      showMessage('success', 'Store updated successfully', 4);
    }

    if (isStoreLogoUpdated) {
      showMessage('success', 'Logo uploaded successfully', 4);
    }

    if (isSaleManagerCreated) {
      showMessage('success', 'Sale Manger created successfully', 4);
    }
  }, [isStoreUpdated, isStoreLogoUpdated, isSaleManagerCreated]);
  return <div></div>;
};

export default SuccessMessages;
