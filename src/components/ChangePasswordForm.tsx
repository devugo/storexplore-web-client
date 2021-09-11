import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { getLoaderState } from '../helpers/functions/getLoadersState';
import { renderServerError } from '../helpers/functions/renderServerError';
import { changePassword } from '../store/actions/auth';
import { CHANGE_PASSWORD } from '../store/actions/types';
import { ChangePasswordType, RootStateType } from '../types.d';
import Button from './Button';
import Input from './Input';

const initialFormValues: ChangePasswordType = {
  password: EMPTY_STRING,
  passwordAgain: EMPTY_STRING,
};

const validationSchema = Yup.object({
  password: Yup.string().required('New password is required'),
  passwordAgain: Yup.string()
    .required('Enter new password again')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match!'),
});

const ChangePasswordForm = () => {
  const dispatch = useDispatch();

  const [formikFormValues] = useState<ChangePasswordType>({
    ...initialFormValues,
  });

  const { loader: loaders } = useSelector((state: RootStateType) => state);

  //  UPDATE PASSWORD LOADERS
  const { inProgress: changeLoading, errorData: changeErrorData } = getLoaderState(
    loaders,
    CHANGE_PASSWORD
  );

  const submit = (values: ChangePasswordType) => {
    dispatch(changePassword(values));
  };

  return (
    <div className="store-owner__sale-manager-content">
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
            {renderServerError(changeErrorData).length > 0 && (
              <div className="server-message mb-2 mt-2">
                <Alert
                  message="Error"
                  description={renderServerError(changeErrorData)}
                  type="error"
                  showIcon
                />
              </div>
            )}
            <div className="form-group">
              <div className="input-container">
                <label>
                  New password <span className="danger">*</span>
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  id="password"
                  value={values.password}
                  icon="mdi mdi-key"
                />
                <small className="danger">
                  {errors.password && touched.password && errors.password}
                </small>
              </div>
              <div className="input-container">
                <label>
                  Enter password again <span className="danger">*</span>
                </label>
                <Input
                  type="password"
                  name="passwordAgain"
                  placeholder="Password Again"
                  onChange={handleChange}
                  id="passwordAgain"
                  value={values.passwordAgain}
                  icon="mdi mdi-key"
                />
                <small className="danger">
                  {errors.passwordAgain && touched.passwordAgain && errors.passwordAgain}
                </small>
              </div>
            </div>
            <div className="button-container">
              <Button type="submit">
                Change Password
                {changeLoading && <LoadingOutlined spin />}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
