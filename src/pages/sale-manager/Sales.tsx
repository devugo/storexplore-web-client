import { Pagination, Table, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContentLoader from '../../components/ContentLoader';
import PageWrapper from '../../components/PageWrapper';
import { CURRENCY } from '../../constants';
import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { PAGINATION } from '../../constants/PAGINATION';
import { formatCurrency } from '../../helpers/functions/formatCurrency';
import { readSales } from '../../store/actions/sale';
import { READ_SALES } from '../../store/actions/types';
import { ApiResponseType, ProductType, RootStateType, SaleType } from '../../types.d';

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
    title: `Sold At (${CURRENCY})`,
    dataIndex: 'soldAt',
    key: 'soldAt',
  },
  {
    title: `Total Amount (${CURRENCY})`,
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

const Sales = () => {
  const dispatch = useDispatch();
  const { sales, loader: loaders } = useSelector((state: RootStateType) => state);

  const [tableData, setTableData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  //  READ LIVE SALES LOADERS
  const readProgressData = loaders.find(
    (x) => x.type === READ_SALES.IN_PROGRESS
  ) as ApiResponseType;
  const readLoading = !!readProgressData;

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getSales = (params: string = EMPTY_STRING) => {
    dispatch(readSales(params, READ_SALES));
  };

  const composeTableData = (data: SaleType[]) => {
    return data.map((x: SaleType) => {
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
    const pageParams = `?page=${currentPage}`;
    getSales(pageParams);
  }, [currentPage]);

  useEffect(() => {
    if (sales.loaded) {
      const tableInfo = composeTableData(sales.data);
      setTableData(tableInfo);
    }
  }, [sales]);

  return (
    <PageWrapper pageTitle="Sales">
      <div className="sale-manager__sales">
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
          {!readLoading && sales.count > 0 && (
            <div className="pagination">
              <Pagination
                defaultPageSize={PAGINATION.itemsPerPage}
                onChange={goToPage}
                current={currentPage}
                total={sales.count}
              />
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Sales;
