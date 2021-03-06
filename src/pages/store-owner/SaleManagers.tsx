import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Pagination, Space, Table, Tag, Tooltip } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ContentLoader from '../../components/ContentLoader';
import GoToButton from '../../components/GoToButton';
import LoaderOverlay from '../../components/LoaderOverlay';
import PageWrapper from '../../components/PageWrapper';
import RenderIcon from '../../components/RenderIcon';
import SearchForm from '../../components/SearchForm';
import { CURRENCY, ONE } from '../../constants';
import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { PAGINATION } from '../../constants/PAGINATION';
import {
  STORE_OWNER_ADD_SALE_MANAGER_ROUTE,
  STORE_OWNER_VIEW_SALE_MANAGER_ROUTE,
} from '../../constants/ROUTE_NAME';
import { formatCurrency } from '../../helpers/functions/formatCurrency';
import { readSaleManagers, updateStatusSaleManager } from '../../store/actions/sale-manager';
import { READ_SALE_MANAGERS, UPDATE_STATUS_SALE_MANAGER } from '../../store/actions/types';
import { ApiResponseType, RootStateType, SaleManagerType } from '../../types.d';

const { confirm } = Modal;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Photo',
    dataIndex: 'photo',
    key: 'photo',
    // eslint-disable-next-line react/display-name
    render: (link: string) => (
      <img style={{ borderRadius: '50%' }} src={link} width="30" height="30" />
    ),
  },
  {
    title: 'DOB',
    dataIndex: 'age',
    key: 'age',
    // eslint-disable-next-line react/display-name
    render: (date: string) => <Tag color="geekblue">{date}</Tag>,
  },
  {
    title: `Total Sales (${CURRENCY})`,
    dataIndex: 'totalSales',
    key: 'totalSales',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    // eslint-disable-next-line react/display-name
    render: ({ active, key }: { active: boolean; key: string }) => {
      const color = active ? 'green' : 'volcano';
      const text = active ? 'Active' : 'Blocked';
      return (
        <Tag color={color} key={key}>
          {text.toUpperCase()}
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
    dataIndex: 'action',
    // eslint-disable-next-line react/display-name
    render: ({ id, active, deleteFunc }: { id: string; active: boolean; deleteFunc: any }) => (
      <Space size="middle">
        <Tooltip title="View" color="cyan">
          <Link to={STORE_OWNER_VIEW_SALE_MANAGER_ROUTE + `/${id}`}>
            <RenderIcon title="mdi mdi-clock-outline" styles={{ color: 'cyan' }} />
          </Link>
        </Tooltip>
        <Tooltip title={active ? 'Block' : 'Activate'} color={active ? 'red' : 'green'}>
          <a onClick={deleteFunc}>
            <RenderIcon
              title="mdi mdi-delete-sweep-outline"
              styles={{ color: active ? 'red' : 'green' }}
            />
          </a>
        </Tooltip>
      </Space>
    ),
  },
];

const SaleManagers = () => {
  const dispatch = useDispatch();
  const { saleManagers, loader: loaders } = useSelector((state: RootStateType) => state);

  const [tableData, setTableData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>(EMPTY_STRING);

  //  READ LIVE SALES LOADERS
  const readProgressData = loaders.find(
    (x) => x.type === READ_SALE_MANAGERS.IN_PROGRESS
  ) as ApiResponseType;
  const readLoading = !!readProgressData;

  //  UPDATE STATUS LOADERS
  const updateStatusProgressData = loaders.find(
    (x) => x.type === UPDATE_STATUS_SALE_MANAGER.IN_PROGRESS
  ) as ApiResponseType;
  const updateStatusLoading = !!updateStatusProgressData;

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const updateStatus = (formData: { active: boolean }, id: string) => {
    dispatch(updateStatusSaleManager(formData, id));
  };

  const updateStatusConfirm = (formData: { active: boolean }, id: string) => {
    const message = formData.active
      ? 'An active user can record sales'
      : 'A blocked user cannot record sales';
    confirm({
      title: `Are you sure you want ${formData.active ? 'activate' : 'block'} this sale manager?`,
      icon: <ExclamationCircleOutlined />,
      content: `${message}. Click Yes to continue`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        updateStatus(formData, id);
      },
    });
  };

  const composeTableData = (data: SaleManagerType[]) => {
    return data.map((x: SaleManagerType) => {
      return {
        key: x.id as string,
        name: x.firstname + ' ' + x.lastname,
        date: moment(x.createdAt).calendar()?.toString() as string,
        age: moment(x.dob).calendar()?.toString() as string,
        photo: x.photo,
        status: { active: x.active, key: x.id },
        totalSales: formatCurrency(x.totalSales as string),
        action: {
          id: x.id,
          active: x.active,
          deleteFunc: () => updateStatusConfirm({ active: x.active ? false : true }, x.id!),
        },
      };
    });
  };

  const searchSaleManagers = (e: any) => {
    e.preventDefault();
    const pageParams = `?search=${searchValue}&page=${ONE}`;
    getSaleManagers(pageParams);
  };

  const getSaleManagers = (params: string = EMPTY_STRING) => {
    dispatch(readSaleManagers(params));
  };

  useEffect(() => {
    const pageParams = `?page=${currentPage}&search=${searchValue}`;
    getSaleManagers(pageParams);
  }, [currentPage]);

  useEffect(() => {
    if (saleManagers.loaded) {
      const tableInfo = composeTableData(saleManagers.data);
      setTableData(tableInfo);
    }
  }, [saleManagers]);

  return (
    <PageWrapper pageTitle="Sale Managers">
      {updateStatusLoading && <LoaderOverlay />}
      <div className="store-owner__sale-maangers">
        <div className="devugo-card">
          <GoToButton goto={STORE_OWNER_ADD_SALE_MANAGER_ROUTE} style={{ marginBottom: 20 }} />
          <SearchForm
            search={searchSaleManagers}
            readLoading={readLoading}
            setSearchValue={setSearchValue}
            placeholder="Search sale managers..."
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
          {!readLoading && saleManagers.count > 0 && (
            <div className="pagination">
              <Pagination
                defaultPageSize={PAGINATION.itemsPerPage}
                onChange={goToPage}
                current={currentPage}
                total={saleManagers.count}
              />
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default SaleManagers;
