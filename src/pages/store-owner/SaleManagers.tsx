import { Space, Table, Tag } from 'antd';

import AddNewButton from '../../components/AddNewButton';
import PageWrapper from '../../components/PageWrapper';
import RenderIcon from '../../components/RenderIcon';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Total Sales',
    dataIndex: 'totalSales',
    key: 'totalSales',
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
    title: 'Date Joined',
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
    name: 'John Brown',
    age: 32,
    date: '12-12-2020',
    totalSales: 'NGN 250,000',
    status: 'active',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    date: '12-12-2020',
    totalSales: 'NGN 250,000',
    status: 'blocked',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    date: '12-12-2020',
    totalSales: 'NGN 250,000',
    status: 'blocked',
  },
];

const SaleManagers = () => {
  return (
    <PageWrapper pageTitle="Sale Managers">
      <div className="store-owner__sale-maangers">
        <div className="devugo-card">
          <AddNewButton goto="/add-new" />
          <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 400 }} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default SaleManagers;
