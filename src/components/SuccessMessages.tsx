import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { MESSAGE_TIME } from '../constants/MESSAGE_TIME';
import { getLoader } from '../helpers/functions/getLoader';
import {
  successCreation,
  successDelete,
  successUpdate,
} from '../helpers/functions/responseChecker';
import { showMessage } from '../helpers/functions/showMessage';
import {
  CREATE_PRODUCT,
  CREATE_SALE_MANAGER,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_IMAGE,
  UPDATE_STATUS_SALE_MANAGER,
  UPDATE_STORE,
  UPDATE_STORE_LOGO,
} from '../store/actions/types';
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

  // UPDATE SALE MANAGER STATUS Loader
  const { successData: updateStatusSaleManagerSuccessData } = getLoader(
    loader,
    UPDATE_STATUS_SALE_MANAGER
  );
  const isSaleManagerStatusUpdated = successUpdate(updateStatusSaleManagerSuccessData);

  // CREATE PRODUCT Loader
  const { successData: createProductSuccessData } = getLoader(loader, CREATE_PRODUCT);
  const isProductCreated = successCreation(createProductSuccessData);

  // UPDATE PRODUCT Loader
  const { successData: updateProductSuccessData } = getLoader(loader, UPDATE_PRODUCT);
  const isProductUpdated = successUpdate(updateProductSuccessData);

  // UPDATE PRODUCT IMAGE Loader
  const { successData: updateProductImageSuccessData } = getLoader(loader, UPDATE_PRODUCT_IMAGE);
  const isProductImageUpdated = successUpdate(updateProductImageSuccessData);

  // DELETE PRODUCT Loader
  const { successData: deleteProductSuccessData } = getLoader(loader, DELETE_PRODUCT);
  const isProductDeleted = successDelete(deleteProductSuccessData);

  useEffect(() => {
    if (isStoreUpdated) {
      showMessage('success', 'Store updated successfully', MESSAGE_TIME);
    }

    if (isStoreLogoUpdated) {
      showMessage('success', 'Logo uploaded successfully', MESSAGE_TIME);
    }

    if (isSaleManagerCreated) {
      showMessage('success', 'Sale Manager created successfully', MESSAGE_TIME);
    }

    if (isSaleManagerStatusUpdated) {
      showMessage('success', 'Sale Manager status updated successfully', MESSAGE_TIME);
    }

    if (isProductCreated) {
      showMessage('success', 'Product created successfully', MESSAGE_TIME);
    }

    if (isProductUpdated) {
      showMessage('success', 'Product updated successfully', MESSAGE_TIME);
    }

    if (isProductImageUpdated) {
      showMessage('success', 'Product image updated successfully', MESSAGE_TIME);
    }

    if (isProductDeleted) {
      showMessage('success', 'Product deleted successfully', MESSAGE_TIME);
    }
  }, [
    isStoreUpdated,
    isStoreLogoUpdated,
    isSaleManagerCreated,
    isProductCreated,
    isProductUpdated,
    isProductImageUpdated,
    isSaleManagerStatusUpdated,
  ]);
  return <div></div>;
};

export default SuccessMessages;
