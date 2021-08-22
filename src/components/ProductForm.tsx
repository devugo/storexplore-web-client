import { Formik } from 'formik';
import { useRef, useState } from 'react';
import * as Yup from 'yup';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { ProductType } from '../types.d';
import Button from './Button';
import Input from './Input';
import PhotoContainer from './PhotoContainer';

const initialFormValues: ProductType = {
  name: EMPTY_STRING,
  description: EMPTY_STRING,
  costPrice: 0,
  sellingPrice: 0,
  quantity: 0,
};

const validationSchema = Yup.object({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  address: Yup.string().required('Address is required'),
  dob: Yup.date().required('Address is required'),
  email: Yup.string().required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  password: Yup.string().required('Password is required'),
});

const ProductForm = ({
  changeImage,
  submit,
}: {
  changeImage: any;
  submit: (values: ProductType) => void;
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const [formikFormValues] = useState(initialFormValues);

  const toggleFileInput = () => {
    fileInput.current?.click();
  };

  return (
    <div className="store-owner__sale-manager-content">
      <PhotoContainer imgSrc="https://logo.png" action={toggleFileInput} />
      <input
        onChange={changeImage}
        ref={fileInput}
        type="file"
        name="image"
        id="image"
        className="hide"
      />
      <Formik
        enableReinitialize
        initialValues={formikFormValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          submit(values);
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
                <label>
                  Name of Product <span className="danger">*</span>
                </label>
                <Input
                  name="name"
                  placeholder="Name of Product"
                  onChange={handleChange}
                  id="name"
                  value={values.name}
                  icon="mdi mdi-user"
                />
                <small className="danger">{errors.name && touched.name && errors.name}</small>
              </div>
              <div className="input-container">
                <label>Description</label>
                <Input
                  name="description"
                  placeholder="Brief description of product"
                  onChange={handleChange}
                  id="description"
                  value={values.description}
                  icon="mdi mdi-email"
                />
                <small className="danger">
                  {errors.description && touched.description && errors.description}
                </small>
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <label>
                  Cost Price <span className="danger">*</span>
                </label>
                <Input
                  type="number"
                  name="costPrice"
                  placeholder="Cost Price"
                  onChange={handleChange}
                  id="othernames"
                  value={values.costPrice}
                  icon="mdi mdi-user"
                />
                <small className="danger">
                  {errors.costPrice && touched.costPrice && errors.costPrice}
                </small>
              </div>
              <div className="input-container">
                <label>
                  Selling Price <span className="danger">*</span>
                </label>
                <Input
                  type="number"
                  name="dob"
                  placeholder="Minimum selling price"
                  onChange={handleChange}
                  id="sellingPrice"
                  value={values.sellingPrice}
                  icon="mdi mdi-email"
                />
                <small className="danger">
                  {errors.sellingPrice && touched.sellingPrice && errors.sellingPrice}
                </small>
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <label>
                  Quantity <span className="danger">*</span>
                </label>
                <Input
                  name="quantity"
                  placeholder="Quantity of product in stock"
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

export default ProductForm;
