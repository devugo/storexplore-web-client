import { Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContentLoader from '../../components/ContentLoader';
import PageWrapper from '../../components/PageWrapper';
import { CURRENCY } from '../../constants';
import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { readSales } from '../../store/actions/sale';
import { READ_SALES_LIVE } from '../../store/actions/types';
import { ApiResponseType, ProductType, RootStateType, SaleType } from '../../types.d';

const columns = [
  {
    title: 'Seller',
    dataIndex: 'seller',
    key: 'seller',
  },
  {
    title: 'Quantity Sold',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    // eslint-disable-next-line react/display-name
    render: (link: string) => (
      <img style={{ borderRadius: '50%' }} src={link} width="30" height="30" />
    ),
  },
  {
    title: 'Item',
    dataIndex: 'item',
    key: 'item',
    // eslint-disable-next-line react/display-name
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: `Cost Price (${CURRENCY})`,
    dataIndex: 'costPrice',
    key: 'costPrice',
  },
  {
    title: `Sold at (${CURRENCY})`,
    dataIndex: 'soldAt',
    key: 'soldAt',
  },
  {
    title: `Total Amount (${CURRENCY})`,
    key: 'totalAmount',
    dataIndex: 'totalAmount',
  },
  {
    title: 'Quantity Left',
    key: 'quantityLeft',
    dataIndex: 'quantityLeft',
  },
];

const LiveSales = () => {
  const dispatch = useDispatch();
  const { sales, loader: loaders } = useSelector((state: RootStateType) => state);

  const [tableData, setTableData] = useState<any[]>([]);

  //  READ LIVE SALES LOADERS
  const readProgressData = loaders.find(
    (x) => x.type === READ_SALES_LIVE.IN_PROGRESS
  ) as ApiResponseType;
  const readLoading = !!readProgressData;

  const getLiveSales = (params: string = EMPTY_STRING) => {
    dispatch(readSales(params, READ_SALES_LIVE));
  };

  const composeTableData = (data: SaleType[]) => {
    return data.map((x: SaleType) => {
      return {
        key: x.id as string,
        seller: x.saleManager?.firstname + ' ' + x.saleManager?.lastname,
        quantity: x.quantity,
        image: (x.product as ProductType).imagePath,
        item: (x.product as ProductType).name,
        costPrice: (x.product as ProductType).costPrice,
        soldAt: x.soldAt,
        totalAmount: x.quantity * x.soldAt,
        quantityLeft: (x.product as ProductType).quantity,
      };
    });
  };

  useEffect(() => {
    const pageParams = `?date=${moment().format('YYYY-MM-DD')}`;
    getLiveSales(pageParams);
  }, []);

  useEffect(() => {
    if (sales.loaded) {
      const tableInfo = composeTableData(sales.liveData);
      setTableData(tableInfo);
    }
  }, [sales]);

  return (
    <PageWrapper pageTitle="Live Sales">
      <div className="store-owner__live-sales">
        <div className="devugo-card">
          {readLoading ? (
            <ContentLoader />
          ) : (
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
              scroll={{ x: 400 }}
            />
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default LiveSales;
