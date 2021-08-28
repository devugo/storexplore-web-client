import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { renderServerError } from '../helpers/functions/renderServerError';
import { CREATE_SALE_MANAGER } from '../store/actions/types';
import { ApiResponseType, RootStateType, SaleManagerType } from '../types.d';
import Button from './Button';
import Input from './Input';
import PhotoContainer from './PhotoContainer';
import RenderIcon from './RenderIcon';
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

const validationSchema = Yup.object({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  dob: Yup.date().required('Date of birth is required'),
  email: Yup.string().required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  password: Yup.string().required('Password is required'),
});

const SaleManagerForm = ({
  changeImage,
  submit,
  hidePhoto,
  defaultPassword,
}: {
  changeImage?: any;
  submit: (values: SaleManagerType) => void;
  hidePhoto?: boolean;
  defaultPassword?: string;
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const [formikFormValues] = useState<SaleManagerType>({
    ...initialFormValues,
    password: defaultPassword ?? '',
  });
  const { loader: loaders } = useSelector((state: RootStateType) => state);

  //  CREATE SALE MANAGER LOADERS
  const createrogressData = loaders.find(
    (x) => x.type === CREATE_SALE_MANAGER.IN_PROGRESS
  ) as ApiResponseType;
  const createLoading = createrogressData ? true : false;
  const createErrorData = loaders.find(
    (x) => x.type === CREATE_SALE_MANAGER.FAILURE
  ) as ApiResponseType;

  const toggleFileInput = () => {
    fileInput.current?.click();
  };

  return (
    <div className="store-owner__sale-manager-content">
      {!hidePhoto && (
        <>
          <PhotoContainer imgSrc="https://logo.png" action={toggleFileInput} />
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
        validationSchema={validationSchema}
        onSubmit={(values) => {
          submit(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, resetForm }) => (
          <form className="form-container" onSubmit={handleSubmit}>
            {renderServerError(createErrorData).length > 0 && (
              <div className="server-message mb-2 mt-2">
                <Alert
                  message="Error"
                  description={renderServerError(createErrorData)}
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
                  icon="mdi mdi-user"
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
                  icon="mdi mdi-email"
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
                  icon="mdi mdi-user"
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
                  icon="mdi mdi-email"
                />
                <small className="danger">{errors.dob && touched.dob && errors.dob}</small>
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <label>
                  <RenderIcon title="mdi mdi-title" /> Select Gender{' '}
                  <span className="danger">*</span>
                </label>
                <SelectInput
                  name="gender"
                  onChange={handleChange}
                  id="gender"
                  value={values.gender}
                  placeholder="Select gender"
                  options={['MALE', 'FEMALE']}
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
                  icon="mdi mdi-email"
                />
                <small className="danger">
                  {errors.address && touched.address && errors.address}
                </small>
              </div>
            </div>
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
                  icon="mdi mdi-email"
                />
                <small className="danger">
                  {errors.password && touched.password && errors.password}
                </small>
              </div>
            </div>
            <div className="button-container">
              <Button type="submit">Add {createLoading && <LoadingOutlined spin />}</Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SaleManagerForm;
