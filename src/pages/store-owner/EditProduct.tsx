import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageWrapper from '../../components/PageWrapper';
import ProductForm from '../../components/ProductForm';
import { FORM_MODE } from '../../constants/FORM_MODE';
import { updateProduct } from '../../store/actions/product';
import { ProductType, RootStateType } from '../../types.d';

const EditProduct = () => {
  const dispatch = useDispatch();
  // Params
  const { id }: { id: string } = useParams();
  const { products } = useSelector((state: RootStateType) => state);

  const [productData, setProductData] = useState<ProductType>();

  const submit = (values: ProductType) => {
    dispatch(updateProduct(values, id));
  };

  useEffect(() => {
    const product = products.data.find((x) => x.id === id);
    setProductData(product);
  }, [products]);

  return (
    <PageWrapper pageTitle="Edit Product">
      <div className="store-owner__edit-product">
        <div className="devugo-card">
          <ProductForm data={productData} mode={FORM_MODE.edit} submit={submit} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditProduct;
