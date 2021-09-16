import { LoadingOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { ProductType, SaleManagerType, SalesFilterDataType } from '../types.d';
import Button from './Button';
import Input from './Input';
import SelectInput from './Select';

const initialFormValues: SalesFilterDataType = {
  product: EMPTY_STRING,
  startDate: EMPTY_STRING,
  endDate: EMPTY_STRING,
  saleManager: EMPTY_STRING,
};

const validationSchema = Yup.object({
  startDate: Yup.date(),
  endDate: Yup.date().when('startDate', (startDate, schema) => startDate && schema.min(startDate)),
});

const SalesFilterForm = ({
  readLoading,
  closeModal,
  submit,
  products,
  saleManagers,
  reloadData,
  resetPage,
  hideSaleManagerInput,
}: {
  readLoading: boolean;
  closeModal: () => void;
  submit: (data: SalesFilterDataType) => void;
  products: ProductType[];
  saleManagers?: SaleManagerType[];
  reloadData: (query?: string) => void;
  resetPage: () => void;
  hideSaleManagerInput?: boolean;
}) => {
  const [formikFormValues, setFormikFormValues] = useState<any>({
    ...initialFormValues,
  });

  const terminateFilter = () => {
    resetPage();
    reloadData();
    closeModal();
    setFormikFormValues(initialFormValues);
  };

  return (
    <div className="sales-filter-form">
      <div className="sales-filter-form__content">
        <div className="close-btn">
          <span onClick={terminateFilter}>x</span>
        </div>
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
              <div className="form-group">
                {!hideSaleManagerInput && saleManagers && (
                  <div className="input-container">
                    <label>Select Sale Manager</label>
                    <SelectInput
                      icon="mdi mdi-shape"
                      name="saleManager"
                      onChange={handleChange}
                      id="saleManager"
                      value={values.saleManager}
                      placeholder="Select sale manager"
                      options={saleManagers.map((x) => ({
                        name: `${x.firstname} ${x.lastname}`,
                        value: x.id,
                      }))}
                    />
                    <small className="danger">
                      {errors.product && touched.product && errors.product}
                    </small>
                  </div>
                )}
                <div className="input-container">
                  <label>Select Product</label>
                  <SelectInput
                    icon="mdi mdi-shape"
                    name="product"
                    onChange={handleChange}
                    id="product"
                    value={values.product}
                    placeholder="Select product"
                    options={products.map((x) => ({ name: x.name, value: x.id }))}
                  />
                  <small className="danger">
                    {errors.product && touched.product && errors.product}
                  </small>
                </div>
              </div>
              <div className="form-group">
                <div className="input-container">
                  <label>Start date</label>
                  <Input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    onChange={handleChange}
                    id="startDate"
                    value={values.startDate}
                    icon="mdi mdi-calendar-range"
                  />
                  <small className="danger">
                    {errors.startDate && touched.startDate && errors.startDate}
                  </small>
                </div>
                <div className="input-container">
                  <label>End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    placeholder="End date"
                    onChange={handleChange}
                    id="endDate"
                    value={values.endDate}
                    icon="mdi mdi-calendar-range"
                  />
                  <small className="danger">
                    {errors.endDate &&
                      touched.endDate &&
                      'End date field must be later than the start date'}
                  </small>
                </div>
              </div>
              <div className="button-container">
                <Button type="submit" disabled={readLoading}>
                  Search
                  {readLoading && <LoadingOutlined spin />}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SalesFilterForm;
