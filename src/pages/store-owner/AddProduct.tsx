import { useDispatch } from 'react-redux';

import PageWrapper from '../../components/PageWrapper';
import ProductForm from '../../components/ProductForm';
import { FORM_MODE } from '../../constants/FORM_MODE';
import { createProduct } from '../../store/actions/product';
import { ProductType } from '../../types.d';

const AddProduct = () => {
  const dispatch = useDispatch();

  const submit = (values: ProductType) => {
    const { name, description, imagePath, costPrice, sellingPrice, quantity } = values;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description!);
    formData.append('image', imagePath!);
    formData.append('costPrice', costPrice.toString());
    formData.append('sellingPrice', sellingPrice.toString());
    formData.append('quantity', quantity.toString());
    dispatch(createProduct(formData));
  };
  return (
    <PageWrapper pageTitle="Add Product">
      <div className="store-owner__add-product">
        <div className="devugo-card">
          <ProductForm mode={FORM_MODE.new} submit={submit} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddProduct;
