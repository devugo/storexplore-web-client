import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import RenderIcon from '../../components/RenderIcon';
import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { renderServerError } from '../../helpers/functions/renderServerError';
import { showMessage } from '../../helpers/functions/showMessage';
import Logo from '../../images/logo.png';
import { signup } from '../../store/actions/auth';
import { SIGNUP_USER } from '../../store/actions/types';
import { ApiResponseType, RootStateType, SignupType } from '../../types.d';

const initialFormValues: SignupType = {
  email: EMPTY_STRING,
  username: EMPTY_STRING,
  password: EMPTY_STRING,
  confirmPassword: EMPTY_STRING,
};

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Please, provide a valid email address'),
  password: Yup.string().required('Password is required'),
  username: Yup.string().required('Username is required'),
  confirmPassword: Yup.string()
    .required('Please confirm password')
    .oneOf([Yup.ref('password')], 'Confirm password must match password'),
});

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loaders = useSelector((state: RootStateType) => state.loader);
  const progressData = loaders.find((x) => x.type === SIGNUP_USER.IN_PROGRESS) as ApiResponseType;
  const loading = progressData ? true : false;
  const errorData = loaders.find((x) => x.type === SIGNUP_USER.FAILURE) as ApiResponseType;
  const successData = loaders.find((x) => x.type === SIGNUP_USER.SUCCESS) as ApiResponseType;

  const signUpWithEmailAndPasswordHandler = (values: SignupType) => {
    const { email, password, username } = values;
    dispatch(signup({ email, password, username }));
  };

  useEffect(() => {
    if (successData?.response?.status == 201) {
      showMessage('success', 'Registration was successfully', 4);
      history.replace('/login');
    }
  }, [successData]);
  return (
    <>
      <div className="auth">
        <div className="devugo-card">
          <div className="logo">
            <img src={Logo} />
          </div>
          <p className="center">
            <strong>Sign up to continue!</strong>
          </p>

          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              signUpWithEmailAndPasswordHandler(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} className="devugo-form">
                {renderServerError(errorData).length > 0 && (
                  <div className="server-message mb-2 mt-2">
                    <Alert
                      message="Error"
                      description={renderServerError(errorData)}
                      type="error"
                      showIcon
                    />
                  </div>
                )}
                <div className="input-container">
                  <label>
                    <RenderIcon title="mdi mdi-email" /> Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    id="email"
                    value={values.email}
                  />
                  <small className="danger">{errors.email && touched.email && errors.email}</small>
                </div>
                <div className="input-container">
                  <label>
                    <RenderIcon title="mdi mdi-user" /> Username
                  </label>
                  <Input
                    name="username"
                    placeholder="Enter your username"
                    onChange={handleChange}
                    id="username"
                    value={values.username}
                  />
                  <small className="danger">
                    {errors.username && touched.username && errors.username}
                  </small>
                </div>
                <div className="input-container">
                  <label>
                    <RenderIcon title="mdi mdi-lock" /> Password
                  </label>
                  <Input
                    name="password"
                    onChange={handleChange}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                  />
                  <small className="danger">
                    {errors.password && touched.password && errors.password}
                  </small>
                </div>
                <div className="input-container">
                  <label>
                    <RenderIcon title="mdi mdi-lock" /> Confirm Password
                  </label>
                  <Input
                    name="confirmPassword"
                    onChange={handleChange}
                    id="confirmPassword"
                    type="password"
                    placeholder="Enter your password again"
                    value={values.confirmPassword}
                  />
                  <small className="danger">
                    {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                  </small>
                </div>
                <Button type="submit" disabled={loading}>
                  Register
                  {loading && <LoadingOutlined spin />}
                </Button>

                <div className="center mt-2">
                  <p>
                    Already have an account? <Link to="/login">Sign in here</Link>
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Register;
