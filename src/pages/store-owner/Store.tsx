import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import LoaderOverlay from '../../components/LoaderOverlay';
import PageWrapper from '../../components/PageWrapper';
import PhotoContainer from '../../components/PhotoContainer';
import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { renderServerError } from '../../helpers/functions/renderServerError';
import { showMessage } from '../../helpers/functions/showMessage';
import { validateImage } from '../../helpers/functions/validateImage';
import { getMyStore, updateStore, updateStoreLogo } from '../../store/actions/store';
import { GET_MY_STORE, UPDATE_STORE, UPDATE_STORE_LOGO } from '../../store/actions/types';
import { ApiResponseType, RootStateType, StoreType } from '../../types.d';

const initialFormValues: StoreType = {
  name: EMPTY_STRING,
  industry: EMPTY_STRING,
  address: EMPTY_STRING,
  defaultPassword: EMPTY_STRING,
};

const validationSchema = Yup.object({
  name: Yup.string().required('Please, provide a title'),
  industry: Yup.string().required('Please, provide an industry your business belongs in'),
  address: Yup.string().nullable(),
  defaultPassword: Yup.string().required('Please, provide a default password'),
});

const Store = () => {
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);

  const [formikFormValues, setFormikFormValues] = useState<StoreType>(initialFormValues);
  const [logo, setLogo] = useState<string>(EMPTY_STRING);

  const { loader: loaders, store } = useSelector((state: RootStateType) => state);

  //  GET_STORE LOADERS
  const progressData = loaders.find((x) => x.type === GET_MY_STORE.IN_PROGRESS) as ApiResponseType;
  const getStoreLoading = !!progressData;

  //  UPDATE_STORE LOADERS
  const updateProgressData = loaders.find(
    (x) => x.type === UPDATE_STORE.IN_PROGRESS
  ) as ApiResponseType;
  const updateLoading = !!updateProgressData;
  const updateErrorData = loaders.find((x) => x.type === UPDATE_STORE.FAILURE) as ApiResponseType;

  //  UPDATE_STORE_LOGO LOADERS
  const updateLogoProgressData = loaders.find(
    (x) => x.type === UPDATE_STORE_LOGO.IN_PROGRESS
  ) as ApiResponseType;
  const updateLogoLoading = !!updateLogoProgressData;
  const updateLogoErrorData = loaders.find(
    (x) => x.type === UPDATE_STORE_LOGO.FAILURE
  ) as ApiResponseType;

  const toggleFileInput = () => {
    fileInput.current?.click();
  };

  const changePhoto = (e: any) => {
    const file = e.target.files[0];
    const isFileValid = validateImage(file);

    if (isFileValid) {
      return updateLogo(file);
    }
  };

  const update = (values: StoreType) => {
    if (store.data) {
      dispatch(updateStore(values, store.data.id!));
    }
  };

  const updateLogo = (image: File) => {
    const form = new FormData();
    form.append('image', image);
    dispatch(updateStoreLogo(form, store.data.id!));
  };

  const getStore = () => {
    dispatch(getMyStore());
  };

  useEffect(() => {
    if (updateLogoErrorData) {
      showMessage('error', 'Error uploading logo', 4);
    }
  }, [updateLogoErrorData]);

  useEffect(() => {
    getStore();
  }, []);

  useEffect(() => {
    if (store.data) {
      const { address, defaultPassword, id, industry, logoPath, name } = store.data;
      setFormikFormValues({
        address,
        defaultPassword: defaultPassword ?? EMPTY_STRING,
        id,
        industry: industry ?? EMPTY_STRING,
        name,
      });
      setLogo(logoPath ?? EMPTY_STRING);
    }
  }, [store]);

  return (
    <PageWrapper pageTitle="Store">
      {updateLogoLoading && <LoaderOverlay />}
      <div className="store-owner__settings">
        <div className="devugo-card">
          <div className="store-owner__settings-content">
            {getStoreLoading ? (
              <LoadingOutlined spin />
            ) : (
              <>
                <PhotoContainer imgSrc={logo} action={toggleFileInput} />
                <input
                  onChange={changePhoto}
                  ref={fileInput}
                  type="file"
                  name="image"
                  id="image"
                  className="hide"
                />
                <Formik
                  enableReinitialize
                  initialValues={formikFormValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    update(values);
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
                            Name of store <span className="danger">*</span>
                          </label>
                          <Input
                            name="name"
                            placeholder="Name of store"
                            onChange={handleChange}
                            id="name"
                            value={values.name}
                            icon="mdi mdi-user"
                          />
                          <small className="danger">
                            {errors.name && touched.name && errors.name}
                          </small>
                        </div>
                        <div className="input-container">
                          <label>
                            Industry of business <span className="danger">*</span>
                          </label>
                          <Input
                            name="industry"
                            placeholder="Name of industry"
                            onChange={handleChange}
                            id="industry"
                            value={values.industry}
                            icon="mdi mdi-email"
                          />
                          <small className="danger">
                            {errors.industry && touched.industry && errors.industry}
                          </small>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-container">
                          <label>Business Address </label>
                          <Input
                            name="address"
                            placeholder="Business address"
                            onChange={handleChange}
                            id="addres"
                            value={values.address}
                            icon="mdi mdi-user"
                          />
                          <small className="danger">
                            {errors.address && touched.address && errors.address}
                          </small>
                        </div>
                        <div className="input-container">
                          <label>Default password </label>
                          <Input
                            name="defaultPassword"
                            placeholder="Enter sale manager default password"
                            onChange={handleChange}
                            id="defaultPassword"
                            value={values.defaultPassword}
                            icon="mdi mdi-email"
                          />
                          <small className="danger">
                            {errors.defaultPassword &&
                              touched.defaultPassword &&
                              errors.defaultPassword}
                          </small>
                        </div>
                      </div>
                      <div className="button-container">
                        <Button disabled={updateLoading} type="submit">
                          Update Store {updateLoading && <LoadingOutlined spin />}
                        </Button>
                      </div>
                    </form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Store;
