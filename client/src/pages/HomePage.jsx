import styles from '../ui/HomePage/HomePageStyle';
import Header from '../ui/Header/Header';
import Hero from '../ui/HomePage/Hero';
import Features from '../ui/HomePage/Features';

function HomePage() {
  return (
    <div className="overflow-x: auto; overflow-y: unset;">
      <Header />
      <Features />
    </div>
  );
}

export default HomePage;
