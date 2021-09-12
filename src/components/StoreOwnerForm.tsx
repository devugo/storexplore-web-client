import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { getLoaderState } from '../helpers/functions/getLoadersState';
import { renderServerError } from '../helpers/functions/renderServerError';
import { validateImage } from '../helpers/functions/validateImage';
import { updateStoreOwner, updateStoreOwnerPhoto } from '../store/actions/store-owner';
import { UPDATE_SALE_MANAGER_PHOTO, UPDATE_STORE_OWNER } from '../store/actions/types';
import { RootStateType, StoreOwnerType } from '../types.d';
import Button from './Button';
import Input from './Input';
import LoaderOverlay from './LoaderOverlay';
import PhotoContainer from './PhotoContainer';

const initialFormValues: StoreOwnerType = {
  name: EMPTY_STRING,
  about: EMPTY_STRING,
};

const validationSchema = Yup.object({
  name: Yup.string().required('First Name is required'),
});

const StoreOwnerForm = ({ data }: { data: StoreOwnerType }) => {
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);

  const [formikFormValues, setFormikFormValues] = useState<StoreOwnerType>({
    ...initialFormValues,
  });
  const [photo, setPhoto] = useState<string>(EMPTY_STRING);

  const { loader: loaders } = useSelector((state: RootStateType) => state);

  // //  UPDATE STORE OWNER LOADERS
  const { inProgress: updateLoading, errorData: updateErrorData } = getLoaderState(
    loaders,
    UPDATE_STORE_OWNER
  );

  //  UPDATE PHOTO
  const { inProgress: updatePhotoLoading } = getLoaderState(loaders, UPDATE_SALE_MANAGER_PHOTO);

  const toggleFileInput = () => {
    fileInput.current?.click();
  };

  const changeImage = (e: any) => {
    const file = e.target.files[0];
    const isFileValid = validateImage(file);

    if (isFileValid) {
      const blobURL = URL.createObjectURL(file);
      setPhoto(blobURL);

      // Upload photo
      const form = new FormData();
      form.append('image', file);
      dispatch(updateStoreOwnerPhoto(form));
    }
  };

  const submit = (values: StoreOwnerType) => {
    dispatch(updateStoreOwner(values));
  };

  useEffect(() => {
    if (data) {
      setFormikFormValues({ ...data });
      setPhoto(data.photo as string);
    }
  }, [data]);

  return (
    <div className="store-owner__sale-manager-content">
      {updatePhotoLoading && <LoaderOverlay />}
      <>
        <PhotoContainer imgSrc={photo} action={toggleFileInput} />
        <input
          onChange={changeImage}
          ref={fileInput}
          type="file"
          name="image"
          id="image"
          className="hide"
        />
      </>
      <Formik
        enableReinitialize
        initialValues={formikFormValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          submit(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, resetForm }) => (
          <form className="form-container" onSubmit={handleSubmit}>
            {renderServerError(updateErrorData).length > 0 && (
              <div className="server-message mb-2 mt-2">
                <Alert
                  message="Error"
                  description={renderServerError(updateErrorData)}
                  type="error"
                  showIcon
                />
              </div>
            )}
            <div className="form-group">
              <div className="input-container">
                <label>
                  Your Name <span className="danger">*</span>
                </label>
                <Input
                  name="name"
                  placeholder="Your Name"
                  onChange={handleChange}
                  id="name"
                  value={values.name}
                  icon="mdi mdi-account"
                />
                <small className="danger">{errors.name && touched.name && errors.name}</small>
              </div>
              <div className="input-container">
                <label>About</label>
                <Input
                  name="about"
                  placeholder="About"
                  onChange={handleChange}
                  id="about"
                  value={values.about}
                  icon="mdi mdi-account"
                />
                <small className="danger">{errors.about && touched.about && errors.about}</small>
              </div>
            </div>
            <div className="button-container">
              <Button type="submit">Update {updateLoading && <LoadingOutlined spin />}</Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default StoreOwnerForm;
