import ForwardSocketMessage from '../../components/ForwardSocketMessagfe';
import PageWrapper from '../../components/PageWrapper';

const Dashboard = () => {
  return (
    <PageWrapper pageTitle="Dashboard">
      <ForwardSocketMessage />
      <div className="sale-manager__dashboard">
        <div className="devugo-card"></div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
