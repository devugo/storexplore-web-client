import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space, Table, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import ContentLoader from '../../components/ContentLoader';
import GoToButton from '../../components/GoToButton';
import PageWrapper from '../../components/PageWrapper';
import RenderIcon from '../../components/RenderIcon';
import { SERVER_BASE_URL } from '../../constants';
import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { SALE_MANAGER_ADD_SALE_ROUTE } from '../../constants/ROUTE_NAME';
import { readSales } from '../../store/actions/sale';
import { READ_SALES_LIVE } from '../../store/actions/types';
import { ApiResponseType, ProductType, RootStateType, SaleType } from '../../types.d';
const socket = io(SERVER_BASE_URL);

const { confirm } = Modal;

const columns = [
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
    title: 'Cost Price (₦)',
    dataIndex: 'costPrice',
    key: 'costPrice',
  },
  {
    title: 'Sold at (₦)',
    dataIndex: 'soldAt',
    key: 'soldAt',
  },
  {
    title: 'Total Amount (₦)',
    key: 'totalAmount',
    dataIndex: 'totalAmount',
  },
  {
    title: 'Date Sold',
    dataIndex: 'date',
    key: 'date',
    // eslint-disable-next-line react/display-name
    render: (date: string) => <Tag color="geekblue">{date}</Tag>,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    // eslint-disable-next-line react/display-name
    render: ({ id, deleteFunc }: { id: string; deleteFunc: any }) => (
      <Space size="middle">
        <Tooltip title="Delete" color="red">
          <a onClick={deleteFunc}>
            <RenderIcon title="mdi mdi-delete-sweep-outline" styles={{ color: 'red' }} />
          </a>
        </Tooltip>
      </Space>
    ),
  },
];

const LiveSales = () => {
  const dispatch = useDispatch();
  const { sales, loader: loaders, auth } = useSelector((state: RootStateType) => state);

  const [tableData, setTableData] = useState<any[]>([]);

  //  READ LIVE SALES LOADERS
  const readProgressData = loaders.find(
    (x) => x.type === READ_SALES_LIVE.IN_PROGRESS
  ) as ApiResponseType;
  const readLoading = !!readProgressData;

  const getLiveSales = (params: string = EMPTY_STRING) => {
    dispatch(readSales(params, READ_SALES_LIVE));
  };

  const removeSale = (id: string) => {
    if (id) {
      socket.emit('delete sale', {
        from: auth.saleManager?.id,
        sale: id,
      });
    }
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: 'Are you sure you want delete this sale?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action is not reversible. Click Yes to continue',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removeSale(id);
      },
    });
  };

  const composeTableData = (data: SaleType[]) => {
    return data.map((x: SaleType) => {
      return {
        key: x.id as string,
        quantity: x.quantity,
        image: (x.product as ProductType).imagePath,
        item: (x.product as ProductType).name,
        costPrice: (x.product as ProductType).costPrice,
        soldAt: x.soldAt,
        totalAmount: x.quantity * x.soldAt,
        date: moment(x.createdAt).calendar()?.toString() as string,
        action: { id: x.id, deleteFunc: () => showDeleteConfirm(x.id!) },
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
      <div className="sale-manager__live-sales">
        <div className="devugo-card">
          <GoToButton goto={SALE_MANAGER_ADD_SALE_ROUTE} style={{ marginBottom: 20 }} />
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
