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
import { getLoader } from '../../helpers/functions/getLoader';
import { renderServerError } from '../../helpers/functions/renderServerError';
import { showMessage } from '../../helpers/functions/showMessage';
import Logo from '../../images/logo.png';
import { signin } from '../../store/actions/auth';
import { SIGNIN_USER } from '../../store/actions/types';
import { RootStateType, SigninType } from '../../types.d';

const initialFormValues: SigninType = {
  email: 'test@gmail.com',
  password: 'Password1234',
};

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Please, provide a valid email address'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loader = useSelector((state: RootStateType) => state.loader);

  const { progressData, successData, errorData } = getLoader(loader, SIGNIN_USER);
  const loading = progressData ? true : false;

  const signInWithEmailAndPasswordHandler = (values: SigninType) => {
    dispatch(signin(values));
  };

  useEffect(() => {
    if (successData?.response?.status == 201) {
      showMessage('success', 'Login was successfully', 4);
      history.replace('/');
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
            <strong>Sign in to continue!</strong>
          </p>

          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              signInWithEmailAndPasswordHandler(values);
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
                <Button disabled={loading} type="submit">
                  Login {loading && <LoadingOutlined spin />}
                </Button>

                <div className="center mt-2">
                  <p>
                    Dont have an account? <Link to="/register">Sign up here</Link>
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

export default Login;
