// import { Alert } from 'antd';
import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import PageWrapper from '../../components/PageWrapper';
// import { COLORS } from '../../constants/COLORS';
import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { StoreType } from '../../types.d';
// import { renderServerError } from '../../helpers/functions/renderServerError';

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

const Settings = () => {
  const [formikFormValues] = useState(initialFormValues);

  const updateStore = (values: { name: string; industry: string }) => {
    console.log({ values });
  };

  return (
    <PageWrapper>
      <div className="store-owner__settings">
        <div className="devugo-card">
          <div className="store-owner__settings-content">
            <div className="settings-logo">
              <img src="https://logo.png" />
            </div>
            <Formik
              enableReinitialize
              initialValues={formikFormValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                updateStore(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit, resetForm }) => (
                <form className="form-container">
                  {/* {renderServerError(errorData || deleteErrorData).length > 0 && (
                    <div className="server-message mb-2 mt-2">
                      <Alert
                        message="Error"
                        description={renderServerError(errorData || deleteErrorData)}
                        type="error"
                        showIcon
                      />
                    </div>
                  )} */}
                  <div className="form-group">
                    <div className="input-container">
                      <label>Name of store</label>
                      <Input
                        name="name"
                        placeholder="Name of store"
                        onChange={handleChange}
                        id="name"
                        value={values.name}
                        icon="mdi mdi-user"
                      />
                      <small className="danger">{errors.name && touched.name && errors.name}</small>
                    </div>
                    <div className="input-container">
                      <label>Industry of business</label>
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
                      <label>Business Address</label>
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
                    <Button type="submit">Update Store</Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Settings;
