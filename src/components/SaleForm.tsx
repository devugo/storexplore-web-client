import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { SaleType } from '../types.d';
import Button from './Button';
import Input from './Input';
import RenderIcon from './RenderIcon';
import SelectInput from './Select';

const initialFormValues: SaleType = {
  soldAt: 0,
  quantity: 0,
  productId: EMPTY_STRING,
};

const validationSchema = Yup.object({
  soldAt: Yup.string().required('Enter amount product was sold'),
  quantity: Yup.string().required('Enter the quantity of product sold'),
  productId: Yup.string().required('Select the product sold'),
});

const SaleForm = ({ submit }: { submit: (values: SaleType) => void }) => {
  const [formikFormValues] = useState(initialFormValues);

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
                <label>
                  <RenderIcon title="mdi mdi-title" /> Select Product{' '}
                  <span className="danger">*</span>
                </label>
                <SelectInput
                  name="productId"
                  placeholder="Product"
                  onChange={handleChange}
                  id="productId"
                  value={values.productId}
                  options={['MALE', 'FEMALE']}
                />
              </div>
              <div className="input-container">
                <label>Date</label>
                <Input
                  name="date"
                  placeholder="Date"
                  onChange={handleChange}
                  id="date"
                  value={values.date}
                  icon="mdi mdi-email"
                />
                <small className="danger">{errors.date && touched.date && errors.date}</small>
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <label>
                  Sold At <span className="danger">*</span>
                </label>
                <Input
                  name="soldAt"
                  placeholder="Sold At"
                  onChange={handleChange}
                  id="soldAt"
                  value={values.soldAt}
                  icon="mdi mdi-user"
                />
                <small className="danger">{errors.soldAt && touched.soldAt && errors.soldAt}</small>
              </div>
              <div className="input-container">
                <label>
                  Quantity <span className="danger">*</span>
                </label>
                <Input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  onChange={handleChange}
                  id="quantity"
                  value={values.quantity}
                  icon="mdi mdi-email"
                />
                <small className="danger">
                  {errors.quantity && touched.quantity && errors.quantity}
                </small>
              </div>
            </div>
            <div className="button-container">
              <Button type="submit">Add</Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SaleForm;
