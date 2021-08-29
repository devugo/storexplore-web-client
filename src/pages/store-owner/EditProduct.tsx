import PageWrapper from '../../components/PageWrapper';
import ProductForm from '../../components/ProductForm';
import { ProductType } from '../../types.d';

const EditProduct = () => {
  const submit = (values: ProductType) => {
    console.log({ values });
  };
  return (
    <PageWrapper pageTitle="Edit Product">
      <div className="store-owner__edit-product">
        <div className="devugo-card">
          <ProductForm submit={submit} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditProduct;
