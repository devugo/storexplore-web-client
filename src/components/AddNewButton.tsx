import { Link } from 'react-router-dom';

const AddNewButton = ({ goto }: { goto: string }) => {
  return (
    <div className="add-new-button">
      <Link className="devugo-btn" to={goto}>
        Add New
      </Link>
    </div>
  );
};

export default AddNewButton;
