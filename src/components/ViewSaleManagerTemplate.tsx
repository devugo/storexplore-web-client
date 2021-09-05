import GoToButton from './GoToButton';

const ViewSaleManagerTemplate = ({ showEditButton }: { showEditButton?: boolean }) => {
  return (
    <div className="view-sale-manager-template">
      <div className="devugo-card">
        <div className="content">
          <div className="left">
            <div className="photo">
              <img src="https://hugo.com/index.png" />
            </div>
            <div className="status">
              <div className="icon"></div> <span>Active</span>
            </div>
            <h3>240 Items sold</h3>
            <h3>NGN 240,000.00 Total Sales</h3>
          </div>

          <div className="right">
            <h2>UGOCHUKWU EZENWANKWO</h2>
            <p>Male</p>
            <p>Joined 22-10-2021</p>
            <p>Sum house, Borno way, Alagomeji Bustop, Yaba, Lagos state</p>
          </div>
        </div>
        {showEditButton && <GoToButton goto="/kkdsk" title="Edit" />}
      </div>
    </div>
  );
};

export default ViewSaleManagerTemplate;
