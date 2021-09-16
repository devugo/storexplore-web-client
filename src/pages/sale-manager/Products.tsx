import { Pagination, Space, Table, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ContentLoader from '../../components/ContentLoader';
import PageWrapper from '../../components/PageWrapper';
import RenderIcon from '../../components/RenderIcon';
import SearchForm from '../../components/SearchForm';
import { CURRENCY, ONE } from '../../constants';
import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { PAGINATION } from '../../constants/PAGINATION';
import { SALE_MANAGER_VIEW_PRODUCT_ROUTE } from '../../constants/ROUTE_NAME';
import { formatCurrency } from '../../helpers/functions/formatCurrency';
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
    title: `Cost Price (${CURRENCY})`,
    dataIndex: 'costPrice',
    key: 'costPrice',
  },
  {
    title: `Selling Price (${CURRENCY})`,
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
    render: ({ id }: { id: string }) => (
      <Space size="middle">
        <Tooltip title="View" color="cyan">
          <Link to={SALE_MANAGER_VIEW_PRODUCT_ROUTE + `/${id}`}>
            <RenderIcon title="mdi mdi-clock-outline" styles={{ color: 'cyan' }} />
          </Link>
        </Tooltip>
      </Space>
    ),
  },
];

const Products = () => {
  const dispatch = useDispatch();
  const { products, loader: loaders } = useSelector((state: RootStateType) => state);

  const [tableData, setTableData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>(EMPTY_STRING);

  //  READ PRODUCTS LOADERS
  const readProgressData = loaders.find(
    (x) => x.type === READ_PRODUCTS.IN_PROGRESS
  ) as ApiResponseType;
  const readLoading = !!readProgressData;

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const composeTableData = (data: ProductType[]) => {
    return data.map((x: ProductType) => {
      return {
        key: x.id as string,
        quantity: x.quantity,
        item: x.name,
        image: x.imagePath as string,
        costPrice: formatCurrency(x.costPrice),
        sellingPrice: formatCurrency(x.sellingPrice),
        date: moment(x.createdAt).calendar()?.toString() as string,
        status: (x.active ? 'active' : 'blocked') as string,
        action: { id: x.id },
      };
    });
  };

  const searchProducts = (e: any) => {
    e.preventDefault();
    const queryParams = `?search=${searchValue}&page=${ONE}`;
    getProducts(queryParams);
  };

  const getProducts = (params: string = EMPTY_STRING) => {
    dispatch(readProducts(params));
  };

  useEffect(() => {
    const queryParams = `?page=${currentPage}&search=${searchValue}`;
    getProducts(queryParams);
  }, [currentPage]);

  useEffect(() => {
    if (products.loaded) {
      const tableInfo = composeTableData(products.data);
      setTableData(tableInfo);
    }
  }, [products]);
  return (
    <PageWrapper pageTitle="Products">
      <div className="sale-manager__products">
        <div className="devugo-card">
          <SearchForm
            search={searchProducts}
            readLoading={readLoading}
            setSearchValue={setSearchValue}
            placeholder="Search for products..."
          />
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
          {!readLoading && products.count > 0 && (
            <div className="pagination">
              <Pagination
                defaultPageSize={PAGINATION.itemsPerPage}
                onChange={goToPage}
                current={currentPage}
                total={products.count}
              />
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Products;
