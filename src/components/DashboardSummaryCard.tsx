import RenderIcon from './RenderIcon';

const DashboardSummaryCard = ({
  title,
  count,
  iconTitle,
  iconClass,
}: {
  title: string;
  count: string;
  iconTitle: string;
  iconClass: string;
}) => {
  return (
    <div className="devugo-card dashboard-summary-card">
      <div className={`icon-wrapper ${iconClass}`}>
        <RenderIcon styles={{ fontSize: 25, color: '#fff' }} title={iconTitle} />
      </div>
      <div className="title-count">
        <div className="title">
          <span>{title}</span>
        </div>
        <div className="count">
          <span>{count}</span>
        </div>
      </div>
    </div>
  );
};
export default DashboardSummaryCard;
