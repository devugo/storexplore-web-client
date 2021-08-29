// import { LoadingOutlined } from '@ant-design/icons';
import { Space, Table, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ContentLoader from '../../components/ContentLoader';
import GoToButton from '../../components/GoToButton';
import PageWrapper from '../../components/PageWrapper';
import RenderIcon from '../../components/RenderIcon';
import {
  STORE_OWNER_ADD_PRODUCT_ROUTE,
  STORE_OWNER_EDIT_PRODUCT_ROUTE,
  STORE_OWNER_VIEW_PRODUCT_ROUTE,
} from '../../constants/ROUTE_NAME';
import { readProducts } from '../../store/actions/product';
import { READ_PRODUCTS } from '../../store/actions/types';
import { ApiResponseType, ProductType, RootStateType } from '../../types.d';

const columns = [
  {
    title: 'Quantity',
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
    dataIndex: 'action',
    key: 'action',
    // eslint-disable-next-line react/display-name
    render: (id: string) => (
      <Space size="middle">
        <Tooltip title="View" color="cyan">
          <Link to={STORE_OWNER_VIEW_PRODUCT_ROUTE}>
            <RenderIcon title="mdi mdi-clock-outline" styles={{ color: 'cyan' }} />
          </Link>
        </Tooltip>
        <Tooltip title="Edit" color="dodgerBlue">
          <Link to={STORE_OWNER_EDIT_PRODUCT_ROUTE + `/${id}`}>
            <RenderIcon title="mdi mdi-playlist-edit" styles={{ color: 'dodgerBlue' }} />
          </Link>
        </Tooltip>
        <Tooltip title="Delete" color="red">
          <a>
            <RenderIcon title="mdi mdi-delete-sweep-outline" styles={{ color: 'red' }} />
          </a>
        </Tooltip>
      </Space>
    ),
  },
];

console.log({ STORE_OWNER_EDIT_PRODUCT_ROUTE });

const Products = () => {
  const dispatch = useDispatch();
  const { products, loader: loaders } = useSelector((state: RootStateType) => state);

  const [tableData, setTableData] = useState<any[]>([]);

  //  CREATE SALE MANAGER LOADERS
  const readProgressData = loaders.find(
    (x) => x.type === READ_PRODUCTS.IN_PROGRESS
  ) as ApiResponseType;
  const readLoading = !!readProgressData;

  const composeTableData = (data: ProductType[]) => {
    return data.map((x: ProductType) => {
      return {
        key: x.id as string,
        quantity: x.quantity,
        item: x.name,
        image: x.imagePath as string,
        costPrice: x.costPrice,
        sellingPrice: x.sellingPrice,
        date: moment(x.createdAt).calendar()?.toString() as string,
        status: (x.active ? 'active' : 'blocked') as string,
        action: x.id,
      };
    });
  };

  const getProducts = () => {
    dispatch(readProducts());
  };

  useEffect(() => {
    if (products.loaded) {
      const tableInfo = composeTableData(products.data);
      setTableData(tableInfo);
    }
  }, [products]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <PageWrapper pageTitle="Products">
      <div className="store-owner__products">
        <div className="devugo-card">
          <GoToButton goto={STORE_OWNER_ADD_PRODUCT_ROUTE} style={{ marginBottom: 20 }} />
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

export default Products;
