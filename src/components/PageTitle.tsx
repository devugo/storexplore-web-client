import { Link } from 'react-router-dom';

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="page-title devugo-card">
      <Link to="/store-owner">Home</Link>
      <span className="icon">&gt;</span>
      <span className="title">{title}</span>
    </div>
  );
};

export default PageTitle;
