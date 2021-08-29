import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { ZERO } from '../constants/ZERO';
import { renderServerError } from '../helpers/functions/renderServerError';
import { showMessage } from '../helpers/functions/showMessage';
// import { showMessage } from '../helpers/functions/showMessage';
import { validateImage } from '../helpers/functions/validateImage';
import { CREATE_PRODUCT } from '../store/actions/types';
import { ApiResponseType, ProductType, RootStateType } from '../types.d';
import Button from './Button';
import Input from './Input';
import PhotoContainer from './PhotoContainer';

const initialFormValues: ProductType = {
  name: EMPTY_STRING,
  description: EMPTY_STRING,
  costPrice: ZERO,
  sellingPrice: ZERO,
  quantity: ZERO,
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name of product is required'),
  costPrice: Yup.number()
    .required('Cost price is required')
    .positive('Cost price must be a positive number'),
  sellingPrice: Yup.number()
    .required('Selling price is required')
    .positive('Selling price must be a positive number'),
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be a positive number'),
});

const ProductForm = ({
  submit,
  mode,
}: {
  submit: (values: ProductType) => void;
  mode?: string;
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const [formikFormValues] = useState<ProductType>(initialFormValues);
  const [image, setImage] = useState<File>();
  const [logo, setLogo] = useState<string>(EMPTY_STRING);

  const { loader: loaders } = useSelector((state: RootStateType) => state);

  //  CREATE PRODUCT LOADERS
  const createrogressData = loaders.find(
    (x) => x.type === CREATE_PRODUCT.IN_PROGRESS
  ) as ApiResponseType;
  const createLoading = createrogressData ? true : false;
  const createErrorData = loaders.find((x) => x.type === CREATE_PRODUCT.FAILURE) as ApiResponseType;

  const changeImage = (e: any) => {
    const file = e.target.files[0];
    const isFileValid = validateImage(file);

    if (isFileValid) {
      const blobURL = URL.createObjectURL(file);
      setLogo(blobURL);
      setImage(file);
    }
  };

  //  Extra validation for image file
  const validate = () => {
    if (typeof image === 'object') {
      return true;
    }
    showMessage('error', 'Please, upload a valid image', 4);
    return false;
  };

  const toggleFileInput = () => {
    fileInput.current?.click();
  };

  return (
    <div className="store-owner__sale-manager-content">
      <PhotoContainer imgSrc={logo} action={toggleFileInput} />
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
          if (validate()) {
            submit({ ...values, image });
          }
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
                  name="sellingPrice"
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
              <Button type="submit">Add {createLoading && <LoadingOutlined spin />}</Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
