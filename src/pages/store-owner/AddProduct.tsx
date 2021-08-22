import PageWrapper from '../../components/PageWrapper';
import ProductForm from '../../components/ProductForm';
import { ProductType } from '../../types.d';

const AddProduct = () => {
  const changeImage = (e: any) => {
    console.log(e.target.files);
  };

  const submit = (values: ProductType) => {
    console.log({ values });
  };
  return (
    <PageWrapper pageTitle="Add Product">
      <div className="store-owner__add-product">
        <div className="devugo-card">
          <ProductForm submit={submit} changeImage={changeImage} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddProduct;
