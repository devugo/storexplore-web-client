import moment from 'moment';

import { CURRENCY } from '../constants';
import { SALE_MANAGER_EDIT_PROFILE_ROUTE } from '../constants/ROUTE_NAME';
import { getStatus } from '../helpers/functions/getStatus';
import { SaleManagerType } from '../types.d';
import GoToButton from './GoToButton';

const ViewSaleManagerTemplate = ({
  saleManager,
  showEditButton,
}: {
  saleManager?: SaleManagerType;
  showEditButton?: boolean;
}) => {
  return (
    <div className="view-sale-manager-template">
      <div className="devugo-card">
        {saleManager && (
          <div className="content">
            <div className="left">
              <div className="photo">
                <img src={saleManager.photo} />
              </div>
              <div className="status">
                <div className={`icon${!saleManager.active ? ' inactive' : ''}`}></div>{' '}
                <span>{getStatus(saleManager.active as boolean)}</span>
              </div>
              <h3>{saleManager.totalProducts} Items sold</h3>
              <h3>
                {CURRENCY} {saleManager.totalSales} Total Sales
              </h3>
            </div>

            <div className="right">
              <h2>
                {saleManager.firstname} {saleManager.lastname}
              </h2>
              <p>{saleManager.gender}</p>
              <p>Joined {moment(saleManager.createdAt).calendar()?.toString()}</p>
              <p>{saleManager.address}</p>
            </div>
          </div>
        )}
        {showEditButton && <GoToButton goto={SALE_MANAGER_EDIT_PROFILE_ROUTE} title="Edit" />}
      </div>
    </div>
  );
};

export default ViewSaleManagerTemplate;
