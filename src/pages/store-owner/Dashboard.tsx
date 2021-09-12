import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ForwardSocketMessage from '../../components/ForwardSocketMessagfe';
import PageWrapper from '../../components/PageWrapper';
import { getMyStore } from '../../store/actions/store';

const Dashboard = () => {
  const dispatch = useDispatch();

  const getStore = () => {
    dispatch(getMyStore());
  };

  useEffect(() => {
    getStore();
  }, []);

  return (
    <PageWrapper pageTitle="Dashboard">
      <ForwardSocketMessage />
      <div className="store-owner__dashboard">
        <div className="devugo-card"></div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
