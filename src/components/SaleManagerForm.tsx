import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Formik } from 'formik';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { FORM_MODE } from '../constants/FORM_MODE';
import { getLoaderState } from '../helpers/functions/getLoadersState';
import { renderServerError } from '../helpers/functions/renderServerError';
import { validateImage } from '../helpers/functions/validateImage';
import { updateSaleManagerPhoto } from '../store/actions/sale-manager';
import {
  CREATE_SALE_MANAGER,
  UPDATE_SALE_MANAGER,
  UPDATE_SALE_MANAGER_PHOTO,
} from '../store/actions/types';
import { RootStateType, SaleManagerType } from '../types.d';
import Button from './Button';
import Input from './Input';
import LoaderOverlay from './LoaderOverlay';
import PhotoContainer from './PhotoContainer';
import SelectInput from './Select';

const initialFormValues: SaleManagerType = {
  firstname: EMPTY_STRING,
  lastname: EMPTY_STRING,
  othernames: EMPTY_STRING,
  address: EMPTY_STRING,
  dob: EMPTY_STRING,
  email: EMPTY_STRING,
  password: EMPTY_STRING,
  gender: EMPTY_STRING,
};

const newValidationSchema = Yup.object({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  dob: Yup.date().required('Date of birth is required'),
  email: Yup.string().required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  password: Yup.string().required('Password is required'),
});

const updateValidationSchema = Yup.object({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  dob: Yup.date().required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
});

const SaleManagerForm = ({
  submit,
  hidePhoto,
  defaultPassword,
  mode,
  data,
}: {
  submit: (values: SaleManagerType) => void;
  hidePhoto?: boolean;
  defaultPassword?: string;
  mode?: string;
  data?: SaleManagerType;
}) => {
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);

  const [formikFormValues, setFormikFormValues] = useState<SaleManagerType>({
    ...initialFormValues,
    password: defaultPassword ?? EMPTY_STRING,
  });
  const [photo, setPhoto] = useState<string>(EMPTY_STRING);

  const { loader: loaders } = useSelector((state: RootStateType) => state);

  //  CREATE SALE MANAGER LOADERS
  const { inProgress: createLoading, errorData: createErrorData } = getLoaderState(
    loaders,
    CREATE_SALE_MANAGER
  );

  // //  CREATE SALE MANAGER LOADERS
  const { inProgress: updateLoading, errorData: updateErrorData } = getLoaderState(
    loaders,
    UPDATE_SALE_MANAGER
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

      // Upload file if in edit mode
      if (mode === FORM_MODE.saleManagerEdit) {
        const form = new FormData();
        form.append('image', file);
        dispatch(updateSaleManagerPhoto(form));
      }
    }
  };

  useEffect(() => {
    if (data && mode === FORM_MODE.saleManagerEdit) {
      setFormikFormValues({ ...data, dob: moment(data.dob).format('YYYY-MM-DD') });
      setPhoto(data.photo as string);
    }
  }, [data]);

  return (
    <div className="store-owner__sale-manager-content">
      {updatePhotoLoading && <LoaderOverlay />}
      {!hidePhoto && (
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
      )}
      <Formik
        enableReinitialize
        initialValues={formikFormValues}
        validationSchema={
          mode === FORM_MODE.saleManagerEdit ? updateValidationSchema : newValidationSchema
        }
        onSubmit={(values) => {
          submit(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, resetForm }) => (
          <form className="form-container" onSubmit={handleSubmit}>
            {renderServerError(createErrorData || updateErrorData).length > 0 && (
              <div className="server-message mb-2 mt-2">
                <Alert
                  message="Error"
                  description={renderServerError(createErrorData || updateErrorData)}
                  type="error"
                  showIcon
                />
              </div>
            )}
            <div className="form-group">
              <div className="input-container">
                <label>
                  Last Name <span className="danger">*</span>
                </label>
                <Input
                  name="lastname"
                  placeholder="Last Name"
                  onChange={handleChange}
                  id="lastname"
                  value={values.lastname}
                  icon="mdi mdi-account"
                />
                <small className="danger">
                  {errors.lastname && touched.lastname && errors.lastname}
                </small>
              </div>
              <div className="input-container">
                <label>
                  First Name <span className="danger">*</span>
                </label>
                <Input
                  name="firstname"
                  placeholder="First Name"
                  onChange={handleChange}
                  id="firstname"
                  value={values.firstname}
                  icon="mdi mdi-account"
                />
                <small className="danger">
                  {errors.firstname && touched.firstname && errors.firstname}
                </small>
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <label>Othernames</label>
                <Input
                  name="othernames"
                  placeholder="Other Names"
                  onChange={handleChange}
                  id="othernames"
                  value={values.othernames}
                  icon="mdi mdi-account"
                />
                <small className="danger">
                  {errors.othernames && touched.othernames && errors.othernames}
                </small>
              </div>
              <div className="input-container">
                <label>
                  Date of birth <span className="danger">*</span>
                </label>
                <Input
                  type="date"
                  name="dob"
                  placeholder="Dirth of birth"
                  onChange={handleChange}
                  id="dob"
                  value={values.dob}
                  icon="mdi mdi-calendar-range"
                />
                <small className="danger">{errors.dob && touched.dob && errors.dob}</small>
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <label>
                  Select Gender
                  <span className="danger">*</span>
                </label>
                <SelectInput
                  icon="mdi mdi-shape"
                  name="gender"
                  onChange={handleChange}
                  id="gender"
                  value={values.gender}
                  placeholder="Select gender"
                  options={[
                    { name: 'Male', value: 'MALE' },
                    { name: 'Female', value: 'FEMALE' },
                  ]}
                />
                <small className="danger">{errors.gender && touched.gender && errors.gender}</small>
              </div>
              <div className="input-container">
                <label>Address</label>
                <Input
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  id="address"
                  value={values.address}
                  icon="mdi mdi-map-marker"
                />
                <small className="danger">
                  {errors.address && touched.address && errors.address}
                </small>
              </div>
            </div>
            {mode !== FORM_MODE.saleManagerEdit && (
              <div className="form-group">
                <div className="input-container">
                  <label>
                    Email <span className="danger">*</span>
                  </label>
                  <Input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    id="email"
                    value={values.email}
                    icon="mdi mdi-email"
                  />
                  <small className="danger">{errors.email && touched.email && errors.email}</small>
                </div>
                <div className="input-container">
                  <label>
                    Password <span className="danger">*</span>
                  </label>
                  <Input
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    id="password"
                    value={values.password}
                    icon="mdi mdi-lock"
                  />
                  <small className="danger">
                    {errors.password && touched.password && errors.password}
                  </small>
                </div>
              </div>
            )}
            <div className="button-container">
              <Button type="submit">
                {mode !== FORM_MODE.saleManagerEdit ? 'Add' : 'Update'}{' '}
                {(createLoading || updateLoading) && <LoadingOutlined spin />}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SaleManagerForm;
