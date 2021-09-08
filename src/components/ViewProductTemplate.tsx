import { Tag } from 'antd';
import moment from 'moment';

import { STORE_OWNER_EDIT_PRODUCT_ROUTE } from '../constants/ROUTE_NAME';
import { USER_TYPE } from '../constants/USER_TYPE';
import { checkQuantityAvailability } from '../helpers/functions/checkQuantityAvailability';
import { formatCurrency } from '../helpers/functions/formatCurrency';
import { ProductType } from '../types.d';
import GoToButton from './GoToButton';

const ViewProductTemplate = ({ mode, product }: { mode: string; product?: ProductType }) => {
  return (
    <div className="view-product-template">
      <div className="devugo-card">
        {product && (
          <div className="content">
            <div className="left">
              <div className="image">
                <img src={product.imagePath as string} alt="product" />
              </div>
              <h3>{product.totalSold} Items sold</h3>
              <h3>{formatCurrency(product.totalSales as string)} Total Sales</h3>
            </div>

            <div className="right">
              <h2>{product.name.toUpperCase()}</h2>
              <div className="status">
                {checkQuantityAvailability(product.quantity) ? (
                  <Tag color="green">In Stock</Tag>
                ) : (
                  <Tag color="volcano">Out of Stock</Tag>
                )}
              </div>
              <div className="price-list">
                <p className="cost-price">
                  <span className="price-title">
                    <b>Cost Price:</b>
                  </span>
                  <span>{formatCurrency(product.costPrice)}</span>
                </p>
                <p className="selling-price">
                  <span className="price-title">
                    <b>Selling Price:</b>
                  </span>
                  <span>{formatCurrency(product.sellingPrice)}</span>
                </p>
              </div>

              <div className="product-available">
                <p>
                  <span className="price-title">
                    <b>Quantity Avaliable:</b>
                  </span>{' '}
                  <span>{product.quantity} items</span>
                </p>
              </div>
              <div className="product-description">
                <p>{product.description}</p>
              </div>
              <p>
                <span className="price-title">
                  <b>Created At:</b>
                </span>{' '}
                <span>{moment(product.createdAt).calendar()?.toString()}</span>
              </p>
            </div>
          </div>
        )}

        {mode === USER_TYPE.storeOwner && (
          <GoToButton
            goto={STORE_OWNER_EDIT_PRODUCT_ROUTE + `/${product && product.id}`}
            title="Edit"
          />
        )}
      </div>
    </div>
  );
};

export default ViewProductTemplate;
