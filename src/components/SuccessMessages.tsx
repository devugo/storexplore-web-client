import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getLoader } from '../helpers/functions/getLoader';
import { successUpdate } from '../helpers/functions/responseChecker';
import { showMessage } from '../helpers/functions/showMessage';
import { UPDATE_STORE, UPDATE_STORE_LOGO } from '../store/actions/types';
import { RootStateType } from '../types.d';

const SuccessMessages = () => {
  const { loader } = useSelector((state: RootStateType) => state);

  // UPDATE STORE Loader
  const { successData: updateStoreSuccessData } = getLoader(loader, UPDATE_STORE);
  const isStoreUpdated = successUpdate(updateStoreSuccessData);

  // UPDATE STORE  LOGO Loader
  const { successData: updateStoreLogoSuccessData } = getLoader(loader, UPDATE_STORE_LOGO);
  const isStoreLogoUpdated = successUpdate(updateStoreLogoSuccessData);

  useEffect(() => {
    if (isStoreUpdated) {
      showMessage('success', 'Store updated successfully', 4);
    }

    if (isStoreLogoUpdated) {
      showMessage('success', 'Logo uploaded successfully', 4);
    }
  }, [isStoreUpdated, isStoreLogoUpdated]);
  return <div></div>;
};

export default SuccessMessages;
