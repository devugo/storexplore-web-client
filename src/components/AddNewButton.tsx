import { Link } from 'react-router-dom';

const AddNewButton = ({ goto, title, style }: { goto: string; title?: string; style?: object }) => {
  return (
    <div className="add-new-button" style={style}>
      <Link className="devugo-btn" to={goto}>
        {title || 'Add New'}
      </Link>
    </div>
  );
};

export default AddNewButton;
