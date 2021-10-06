import { Table, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContentLoader from '../../components/ContentLoader';
import DashboardSummaryCard from '../../components/DashboardSummaryCard';
import DashboardSummaryFormatPills from '../../components/DashboardSummaryFormatPills';
import PageWrapper from '../../components/PageWrapper';
import { CURRENCY } from '../../constants';
import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { formatCurrency } from '../../helpers/functions/formatCurrency';
import { readSales, readSalesSummary } from '../../store/actions/sale';
import { getMyStore } from '../../store/actions/store';
import { READ_SALES } from '../../store/actions/types';
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
  {
    title: 'Date Sold',
    dataIndex: 'date',
    key: 'date',
    // eslint-disable-next-line react/display-name
    render: (date: string) => <Tag color="geekblue">{date}</Tag>,
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { sales, loader: loaders } = useSelector((state: RootStateType) => state);
  const [tableData, setTableData] = useState<any[]>([]);
  const [format, setFormat] = useState<string>('month');

  //  READ SALES LOADERS
  const readProgressData = loaders.find(
    (x) => x.type === READ_SALES.IN_PROGRESS
  ) as ApiResponseType;
  const readLoading = !!readProgressData;

  const changeFormat = (value: string) => {
    setFormat(value);
  };

  const getStore = () => {
    dispatch(getMyStore());
  };

  const getSales = (params: string = EMPTY_STRING) => {
    dispatch(readSales(params, READ_SALES));
  };

  const getSalesSummary = (format: string) => {
    dispatch(readSalesSummary(format));
  };

  const composeTableData = (data: SaleType[]) => {
    return data
      .filter((x, index) => index < 5)
      .map((x: SaleType) => {
        return {
          key: x.id as string,
          seller: x.saleManager?.firstname + ' ' + x.saleManager?.lastname,
          quantity: x.quantity,
          image: (x.product as ProductType).imagePath,
          item: (x.product as ProductType).name,
          costPrice: formatCurrency((x.product as ProductType).costPrice),
          soldAt: formatCurrency(x.soldAt),
          totalAmount: formatCurrency(x.quantity * x.soldAt),
          quantityLeft: (x.product as ProductType).quantity,
          date: moment(x.createdAt).calendar()?.toString() as string,
        };
      });
  };

  useEffect(() => {
    getStore();
    getSales();
  }, []);

  useEffect(() => {
    getSalesSummary(format);
  }, [format]);

  useEffect(() => {
    if (sales.loaded) {
      const tableInfo = composeTableData(sales.data);
      setTableData(tableInfo);
    }
  }, [sales]);

  return (
    <PageWrapper pageTitle="Dashboard">
      <div className="store-owner__dashboard">
        <DashboardSummaryFormatPills format={format} changeFormat={changeFormat} />
        <div className="dashboard-summary-cards">
          <DashboardSummaryCard
            title="Total Sales"
            count={formatCurrency(sales.summary.totalSales)}
            iconTitle="mdi mdi-account-supervisor"
            iconClass="ugo"
          />
          <DashboardSummaryCard
            title="Total Profit"
            count={formatCurrency(sales.summary.totalProfit)}
            iconTitle="mdi mdi-account-supervisor"
            iconClass="ugo"
          />
          <DashboardSummaryCard
            title="Total Items Sold"
            count={sales.summary.totalItemsSold}
            iconTitle="mdi mdi-account-supervisor"
            iconClass="ugo"
          />
        </div>
        <div className="devugo-card">
          <div className="card-title">
            <h4>
              <b>Recent Sales</b>
            </h4>
          </div>
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

export default Dashboard;
