const DashboardSummaryFormatPills = ({
  format,
  changeFormat,
}: {
  format: string;
  changeFormat: (value: string) => void;
}) => {
  return (
    <div className="dashboard-summary-formats">
      <div className="dashboard-summary-formats__pills">
        <div
          onClick={() => changeFormat('today')}
          className={`dashboard-summary-formats__pill${format === 'today' ? ' active' : ''}`}
        >
          <span>Today</span>
        </div>
        <div
          onClick={() => changeFormat('week')}
          className={`dashboard-summary-formats__pill${format === 'week' ? ' active' : ''}`}
        >
          <span>Week</span>
        </div>
        <div
          onClick={() => changeFormat('month')}
          className={`dashboard-summary-formats__pill${format === 'month' ? ' active' : ''}`}
        >
          <span>Month</span>
        </div>
        <div
          onClick={() => changeFormat('year')}
          className={`dashboard-summary-formats__pill${format === 'year' ? ' active' : ''}`}
        >
          <span>Year</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummaryFormatPills;
