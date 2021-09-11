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
  CHANGE_PASSWORD,
  CREATE_PRODUCT,
  CREATE_SALE_MANAGER,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_IMAGE,
  UPDATE_SALE_MANAGER,
  UPDATE_SALE_MANAGER_PHOTO,
  UPDATE_STATUS_SALE_MANAGER,
  UPDATE_STORE,
  UPDATE_STORE_LOGO,
  UPDATE_STORE_OWNER_PHOTO,
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

  // UPDATE SALE MANAGER PHOTO Loader
  const { successData: updatePhotoSaleManagerSuccessData } = getLoader(
    loader,
    UPDATE_SALE_MANAGER_PHOTO
  );
  const isSaleManagerPhotoUpdated = successUpdate(updatePhotoSaleManagerSuccessData);

  // UPDATE SALE MANAGER Loader
  const { successData: updateSaleManagerSuccessData } = getLoader(loader, UPDATE_SALE_MANAGER);
  const isSaleManagerUpdated = successUpdate(updateSaleManagerSuccessData);

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

  // UPDATE STORE OWNER PHOTO Loader
  const { successData: updatePhotoStoreOwnerSuccessData } = getLoader(
    loader,
    UPDATE_STORE_OWNER_PHOTO
  );
  const isStoreOwnerPhotoUpdated = successUpdate(updatePhotoStoreOwnerSuccessData);

  // UPDATE STORE OWNER Loader
  const { successData: updateStoreOwnerSuccessData } = getLoader(loader, UPDATE_SALE_MANAGER);
  const isStoreOwnerUpdated = successUpdate(updateStoreOwnerSuccessData);

  // CHANGE PASSWORD Loader
  const { successData: changePasswordSuccessData } = getLoader(loader, CHANGE_PASSWORD);
  const isPasswordChanged = successDelete(changePasswordSuccessData);

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

    if (isSaleManagerPhotoUpdated) {
      showMessage('success', 'Your photo updated successfully', MESSAGE_TIME);
    }

    if (isSaleManagerUpdated) {
      showMessage('success', 'Your profile updated successfully', MESSAGE_TIME);
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

    if (isStoreOwnerUpdated) {
      showMessage('success', 'Profile updated successfully', MESSAGE_TIME);
    }

    if (isStoreOwnerPhotoUpdated) {
      showMessage('success', 'Your photo updated successfully', MESSAGE_TIME);
    }

    if (isPasswordChanged) {
      showMessage('success', 'Password changed successfully', MESSAGE_TIME);
    }
  }, [
    isStoreUpdated,
    isStoreLogoUpdated,
    isSaleManagerCreated,
    isProductCreated,
    isProductUpdated,
    isProductImageUpdated,
    isProductDeleted,
    isSaleManagerStatusUpdated,
    isSaleManagerPhotoUpdated,
    isSaleManagerUpdated,
    isStoreOwnerUpdated,
    isStoreOwnerPhotoUpdated,
    isPasswordChanged,
  ]);
  return <div></div>;
};

export default SuccessMessages;
