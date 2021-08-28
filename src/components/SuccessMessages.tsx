import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getLoader } from '../helpers/functions/getLoader';
import { successUpdate } from '../helpers/functions/responseChecker';
import { showMessage } from '../helpers/functions/showMessage';
import { UPDATE_STORE } from '../store/actions/types';
import { RootStateType } from '../types.d';

const SuccessMessages = () => {
  const { loader } = useSelector((state: RootStateType) => state);

  // UPDATE STORE Loader
  const { successData: updateStoreSuccessData } = getLoader(loader, UPDATE_STORE);
  const isStoreUpdated = successUpdate(updateStoreSuccessData);

  useEffect(() => {
    if (isStoreUpdated) {
      showMessage('success', 'Store was updated successfully', 4);
    }
  }, [isStoreUpdated]);
  return <div></div>;
};

export default SuccessMessages;
