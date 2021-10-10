import HomeBanner from '../../components/HomeBanner';
import HomeFeatures from '../../components/HomeFeatures';
import HomeFooter from '../../components/HomeFooter';
import HomeHeader from '../../components/HomeHeader';
import HomeMiddleSection from '../../components/HomeMiddleSection';

const Home = () => {
  return (
    <div className="home">
      <HomeHeader />
      <HomeBanner />
      <HomeFeatures />
      <HomeMiddleSection />
      <HomeFooter />
    </div>
  );
};

export default Home;
