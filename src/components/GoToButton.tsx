import { Link } from 'react-router-dom';

const GoToButton = ({ goto, title, style }: { goto: string; title?: string; style?: object }) => {
  return (
    <div className="go-to-button" style={style}>
      <Link className="devugo-btn" to={goto}>
        {title || 'Add New'}
      </Link>
    </div>
  );
};

export default GoToButton;
