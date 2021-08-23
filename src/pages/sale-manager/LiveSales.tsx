import { Table, Tag } from 'antd';

import PageWrapper from '../../components/PageWrapper';

const columns = [
  {
    title: 'Batch',
    dataIndex: 'batch',
    key: 'batch',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Item',
    dataIndex: 'item',
    key: 'item',
    // eslint-disable-next-line react/display-name
    render: (text: string) => (
      <>
        <img
          style={{ borderRadius: '50%' }}
          src="https://kskksd.com/index.png"
          width="30"
          height="30"
        />
        <span>{text}</span>
      </>
    ),
  },
  {
    title: 'Selling Price',
    dataIndex: 'sellingPrice',
    key: 'sellingPrice',
  },
  {
    title: 'Sold At',
    dataIndex: 'soldAt',
    key: 'soldAt',
  },
  {
    title: 'Total Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
  },
  {
    title: 'Date Sold',
    dataIndex: 'date',
    key: 'date',
    // eslint-disable-next-line react/display-name
    render: (date: string) => <Tag color="geekblue">{date}</Tag>,
  },
];

const data = [
  {
    batch: 'hdbsjkds',
    key: '1',
    quantity: 32,
    item: 'Electrode',
    sellingPrice: 4000,
    soldAt: 4500,
    date: '12-12-2020',
    totalAmount: 4500,
  },
  {
    batch: 'hdbsjkds',
    key: '2',
    quantity: 2,
    item: 'Jim Green',
    sellingPrice: 2200,
    soldAt: 3000,
    date: '12-12-2020',
    totalAmount: 4500,
  },
  {
    batch: 'hdbsjkds',
    key: '3',
    quantity: 102,
    item: 'Joe Black',
    sellingPrice: 100,
    soldAt: 130,
    date: '12-12-2020',
    totalAmount: 4500,
  },
];

const LiveSales = () => {
  return (
    <PageWrapper pageTitle="Live Sales">
      <div className="sale-manager__live-sales">
        <div className="devugo-card">
          <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 400 }} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default LiveSales;
