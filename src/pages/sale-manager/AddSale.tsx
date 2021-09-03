// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import PageWrapper from '../../components/PageWrapper';
import SaleForm from '../../components/SaleForm';
import { SERVER_BASE_URL } from '../../constants';
// import { createSale } from '../../store/actions/sale';
import { RootStateType, SaleType } from '../../types.d';
const socket = io(SERVER_BASE_URL);

const AddSale = () => {
  // const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStateType) => state);

  const submit = (values: SaleType) => {
    if (values) {
      socket.emit('add sale', {
        from: auth.id,
        sale: values,
      });
    }
  };

  return (
    <PageWrapper pageTitle="Add Sale">
      <div className="sale-manager__add-sale">
        <div className="devugo-card">
          <SaleForm submit={submit} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddSale;
