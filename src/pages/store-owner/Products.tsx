import { Space, Table, Tag } from 'antd';

import GoToButton from '../../components/GoToButton';
import PageWrapper from '../../components/PageWrapper';
import RenderIcon from '../../components/RenderIcon';
import { STORE_OWNER_ADD_PRODUCT_ROUTE } from '../../constants/ROUTE_NAMES';

const columns = [
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
    title: 'Cost Price',
    dataIndex: 'costPrice',
    key: 'costPrice',
  },
  {
    title: 'Selling Price',
    dataIndex: 'sellingPrice',
    key: 'sellingPrice',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    // eslint-disable-next-line react/display-name
    render: (status: string) => {
      const color = status === 'blocked' ? 'volcano' : 'green';
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Date Added',
    dataIndex: 'date',
    key: 'date',
    // eslint-disable-next-line react/display-name
    render: (date: string) => <Tag color="geekblue">{date}</Tag>,
  },
  {
    title: 'Action',
    key: 'action',
    // eslint-disable-next-line react/display-name
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>
          <RenderIcon title="mdi mdi-clock-outline" styles={{ color: 'grey' }} />
        </a>
        <a>
          <RenderIcon title="mdi mdi-playlist-edit" styles={{ color: 'dodgerBlue' }} />
        </a>
        <a>
          <RenderIcon title="mdi mdi-delete-sweep-outline" styles={{ color: 'red' }} />
        </a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    quantity: 32,
    item: 'Electrode',
    costPrice: 4000,
    sellingPrice: 4500,
    date: '12-12-2020',
    status: 'active',
  },
  {
    key: '2',
    quantity: 2,
    item: 'Jim Green',
    costPrice: 2200,
    sellingPrice: 3000,
    date: '12-12-2020',
    status: 'blocked',
  },
  {
    key: '3',
    quantity: 102,
    item: 'Joe Black',
    costPrice: 100,
    sellingPrice: 130,
    date: '12-12-2020',
    status: 'blocked',
  },
];

const Products = () => {
  return (
    <PageWrapper pageTitle="Products">
      <div className="store-owner__products">
        <div className="devugo-card">
          <GoToButton goto={STORE_OWNER_ADD_PRODUCT_ROUTE} style={{ marginBottom: 20 }} />
          <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 400 }} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Products;
