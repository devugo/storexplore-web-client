import { Tag } from 'antd';

import { STORE_OWNER_EDIT_PRODUCT_ROUTE } from '../constants/ROUTE_NAME';
import { USER_TYPE } from '../constants/USER_TYPE';
import GoToButton from './GoToButton';

const ViewProductTemplate = ({ mode }: { mode: string }) => {
  return (
    <div className="view-product-template">
      <div className="devugo-card">
        <div className="content">
          <div className="left">
            <div className="image">
              <img src="https://hugo.com/index.png" />
            </div>
            <h3>240 Items sold</h3>
            <h3>NGN 240,000.00 Total Sales</h3>
          </div>

          <div className="right">
            <h2>ROYAL ARC ELECTRODE</h2>
            <div className="status">
              <Tag color="green">In Stock</Tag>
              <Tag color="volcano">Out of Stock</Tag>
            </div>
            <div className="price-list">
              <p className="cost-price">
                <span className="price-title">
                  <b>Cost Price:</b>
                </span>
                <span>NGN 3,500.00</span>
              </p>
              <p className="selling-price">
                <span className="price-title">
                  <b>Selling Price:</b>
                </span>
                <span>NGN 4,500.00</span>
              </p>
            </div>

            <div className="product-available">
              <p>
                <span className="price-title">
                  <b>Quantity Avaliable:</b>
                </span>{' '}
                <span>450 items</span>
              </p>
            </div>
            <div className="product-description">
              <p>
                THe fjdnfj df kd k f vck vx vcvjkcnv vcn vncjnv cvjc vkcnv cvcjvjcv cv c v cv
                cknvjcn jv cj vjc vjn jdfbj jd f jd vjd vjj dj jv dj jf d vjfdjf j jf gfjgjf gj fj
                gjf jd fjd j jfdbfjjd jd fdjfdj f j
              </p>
            </div>
            <p>
              <span className="price-title">
                <b>Created At:</b>
              </span>{' '}
              <span>22-10-2021</span>
            </p>
          </div>
        </div>
        {mode === USER_TYPE.storeOwner && (
          <GoToButton goto={STORE_OWNER_EDIT_PRODUCT_ROUTE} title="Edit" />
        )}
      </div>
    </div>
  );
};

export default ViewProductTemplate;
