import ChatsImage from '../images/storexplore-chats.png';
import SalesImage from '../images/storexplore-live-sales.png';
import HomeFeature from './HomeFeature';

const HomeFeatures = () => {
  return (
    <div className="home-features">
      <HomeFeature
        first="title"
        mainTitle="Live Sales"
        secTitle="View sales from sale managers in real time."
        image={SalesImage}
      />
      <HomeFeature
        first="image"
        mainTitle="Live Chats"
        secTitle="Easy access to sale managers with our real time chat feature."
        image={ChatsImage}
      />
    </div>
  );
};

export default HomeFeatures;
