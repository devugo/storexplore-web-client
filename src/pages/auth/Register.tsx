import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { renderServerError } from '../../helpers/functions/renderServerError';
import { showMessage } from '../../helpers/functions/showMessage';
import Logo from '../../images/logo.png';
import { signup } from '../../store/actions/auth';
import { SIGNUP_USER } from '../../store/actions/types';
import { ApiResponseType, RootStateType, SignupType } from '../../types.d';

const initialFormValues: SignupType = {
  email: EMPTY_STRING,
  name: EMPTY_STRING,
  password: EMPTY_STRING,
  confirmPassword: EMPTY_STRING,
};

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Please, provide a valid email address'),
  password: Yup.string().required('Password is required'),
  name: Yup.string().required('Your name is required'),
  confirmPassword: Yup.string()
    .required('Please, confirm password')
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
    const { email, password, name } = values;
    dispatch(signup({ email, password, name }));
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
          <div className="content">
            <div className="text-section">
              <div className="logo">
                <img src={Logo} />
              </div>
              <p>Welcome! Kindly provide your personal details to begin using Storexplore.</p>

              <p className="mt-2">Already have an account?</p>
              <Link to="/login">SIGN IN</Link>
            </div>
            <div className="form-section">
              <div className="logo mobile">
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
                      <label>Name</label>
                      <Input
                        name="name"
                        placeholder="Enter your name"
                        onChange={handleChange}
                        id="name"
                        value={values.name}
                        icon="mdi mdi-account"
                      />
                      <small className="danger">{errors.name && touched.name && errors.name}</small>
                    </div>
                    <div className="input-container">
                      <label>Email</label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        id="email"
                        value={values.email}
                        icon="mdi mdi-email"
                      />
                      <small className="danger">
                        {errors.email && touched.email && errors.email}
                      </small>
                    </div>
                    <div className="input-container">
                      <label>Password</label>
                      <Input
                        name="password"
                        onChange={handleChange}
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={values.password}
                        icon="mdi mdi-lock"
                      />
                      <small className="danger">
                        {errors.password && touched.password && errors.password}
                      </small>
                    </div>
                    <div className="input-container">
                      <label>Confirm Password</label>
                      <Input
                        name="confirmPassword"
                        onChange={handleChange}
                        id="confirmPassword"
                        type="password"
                        placeholder="Enter your password again"
                        value={values.confirmPassword}
                        icon="mdi mdi-lock"
                      />
                      <small className="danger">
                        {errors.confirmPassword &&
                          touched.confirmPassword &&
                          errors.confirmPassword}
                      </small>
                    </div>
                    <Button type="submit" disabled={loading}>
                      Register
                      {loading && <LoadingOutlined spin />}
                    </Button>

                    <div className="center mt-2 mobile">
                      <p>
                        Already have an account? <Link to="/login">Sign in here</Link>
                      </p>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
