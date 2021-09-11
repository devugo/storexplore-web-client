import { LoadingOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { FORM_MODE } from '../constants/FORM_MODE';
import { MESSAGE_TIME } from '../constants/MESSAGE_TIME';
import { ZERO } from '../constants/ZERO';
import { getProgressState } from '../helpers/functions/getLoadersState';
import { renderServerError } from '../helpers/functions/renderServerError';
import { showMessage } from '../helpers/functions/showMessage';
import { validateImage } from '../helpers/functions/validateImage';
import { updateProductImage } from '../store/actions/product';
import { CREATE_PRODUCT, UPDATE_PRODUCT, UPDATE_PRODUCT_IMAGE } from '../store/actions/types';
import { ApiResponseType, ProductType, RootStateType } from '../types.d';
import Button from './Button';
import Input from './Input';
import LoaderOverlay from './LoaderOverlay';
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
  data,
}: {
  submit: (values: ProductType) => void;
  mode: string;
  data?: ProductType;
}) => {
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);

  const [formikFormValues, setFormikFormValues] = useState<ProductType>(initialFormValues);
  const [image, setImage] = useState<File>();
  const [logo, setLogo] = useState<string>(EMPTY_STRING);

  const { loader: loaders } = useSelector((state: RootStateType) => state);

  //  CREATE PRODUCT LOADERS
  const createProgressData = loaders.find(
    (x) => x.type === CREATE_PRODUCT.IN_PROGRESS
  ) as ApiResponseType;
  const createLoading = !!createProgressData;
  const createErrorData = loaders.find((x) => x.type === CREATE_PRODUCT.FAILURE) as ApiResponseType;

  //  UPDATE PRODUCT LOADERS
  const updateProgressData = loaders.find(
    (x) => x.type === UPDATE_PRODUCT.IN_PROGRESS
  ) as ApiResponseType;
  const updateLoading = !!updateProgressData;
  const updateErrorData = loaders.find((x) => x.type === UPDATE_PRODUCT.FAILURE) as ApiResponseType;

  //  UPDATE PRODUCT IMAGE LOADERS
  const updateImageLoading = getProgressState(loaders, UPDATE_PRODUCT_IMAGE);

  const changeImage = (e: any) => {
    const file = e.target.files[0];
    const isFileValid = validateImage(file);

    if (isFileValid) {
      const blobURL = URL.createObjectURL(file);
      setLogo(blobURL);
      setImage(file);

      // Upload file if in edit mode
      if (mode === FORM_MODE.edit) {
        const form = new FormData();
        form.append('image', file);
        dispatch(updateProductImage(form, data?.id as string));
      }
    }
  };

  //  Extra validation for image file
  const validate = () => {
    if (typeof image === 'object') {
      return true;
    }
    showMessage('error', 'Please, upload a valid image', MESSAGE_TIME);
    return false;
  };

  const toggleFileInput = () => {
    fileInput.current?.click();
  };

  useEffect(() => {
    if (data && mode === FORM_MODE.edit) {
      setFormikFormValues(data);
      setLogo(data.imagePath as string);
    }
  }, [data]);

  return (
    <div className="store-owner__sale-manager-content">
      {updateImageLoading && <LoaderOverlay />}
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
          if (mode === FORM_MODE.new) {
            if (validate()) {
              submit({ ...values, imagePath: image });
            }
          } else {
            submit(values);
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, resetForm }) => (
          <form className="form-container" onSubmit={handleSubmit}>
            {renderServerError(createErrorData || updateErrorData).length > 0 && (
              <div className="server-message mb-2 mt-2">
                <Alert
                  message="Error"
                  description={renderServerError(createErrorData || updateErrorData)}
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
              {mode === FORM_MODE.new ? (
                <Button disabled={createLoading} type="submit">
                  Add {createLoading && <LoadingOutlined spin />}
                </Button>
              ) : (
                <Button disabled={createLoading} type="submit">
                  Update {updateLoading && <LoadingOutlined spin />}
                </Button>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
