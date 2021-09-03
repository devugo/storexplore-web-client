import { Select } from 'antd';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { readProducts } from '../store/actions/product';
import { RootStateType, SaleType } from '../types.d';
import Button from './Button';
import Input from './Input';
import RenderIcon from './RenderIcon';

const initialFormValues: SaleType = {
  soldAt: 0,
  quantity: 0,
};

const emptyFormData: { product: string } = {
  product: EMPTY_STRING,
};

const validationSchema = Yup.object({
  soldAt: Yup.number()
    .min(1, 'Amount sold at should be greater than 1')
    .required('Enter amount product was sold'),
  quantity: Yup.number()
    .min(1, 'Quantity should be greater than 1')
    .required('Enter the quantity of product sold'),
});

const SaleForm = ({ submit }: { submit: (values: SaleType) => void }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootStateType) => state);

  const [formikFormValues] = useState(initialFormValues);
  const [formData, setFormData] = useState<any>(emptyFormData);
  const { Option }: { Option: any } = Select;

  const changeSelect = (value: any, key: string) => {
    setFormData({
      ...formData,
      [key]: key === 'level' && value === formData[key] ? EMPTY_STRING : value,
    });
  };

  const getProducts = () => {
    dispatch(readProducts());
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="store-owner__sale-manager-content">
      <Formik
        enableReinitialize
        initialValues={formikFormValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          submit({
            ...values,
            productId: formData.product,
          });
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, resetForm }) => (
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-container">
                <label>
                  <RenderIcon title="mdi mdi-title" /> Select Product{' '}
                  <span className="danger">*</span>
                </label>
                <Select
                  allowClear
                  placeholder="Please select"
                  value={formData.product}
                  onChange={(value) => changeSelect(value, 'product')}
                  id="product"
                  showArrow={false}
                  className="devugo-selector"
                >
                  {products.data.map((product, index) => (
                    <Option key={index} value={product.id}>
                      {product.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="input-container">
                <label>Cost Price</label>
                <Input
                  disabled
                  name="costPrice"
                  placeholder="Cost Price"
                  id="costPrice"
                  value={products.data.find((x) => x.id === formData.product)?.costPrice}
                  icon="mdi mdi-email"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <label>Quantity Left</label>
                <Input
                  disabled
                  name="quantityLeft"
                  placeholder="Quantity left"
                  id="quantityLeft"
                  value={products.data.find((x) => x.id === formData.product)?.quantity}
                  icon="mdi mdi-user"
                />
              </div>
              <div className="input-container">
                <label>
                  Quantity Sold<span className="danger">*</span>
                </label>
                <Input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  onChange={handleChange}
                  id="quantity"
                  value={values.quantity}
                  icon="mdi mdi-email"
                  min={1}
                  max={products.data.find((x) => x.id === formData.product)?.quantity}
                  disabled={
                    formData.product
                      ? products.data.find((x) => x.id === formData.product)?.quantity == 0
                      : true
                  }
                />
                <small className="danger">
                  {errors.quantity && touched.quantity && errors.quantity}
                </small>
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
                  min={1}
                  disabled={
                    formData.product
                      ? products.data.find((x) => x.id === formData.product)?.quantity == 0
                      : true
                  }
                />
                <small className="danger">{errors.soldAt && touched.soldAt && errors.soldAt}</small>
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
