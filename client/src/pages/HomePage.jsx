import styles from '../ui/HomePage/HomePageStyle';
import Header from '../ui/Header/Header';
import Hero from '../ui/HomePage/Hero';
import Features from '../ui/HomePage/Features/Features';
import Testimonials from '../ui/HomePage/Testimonials/Testimonials';
import Test from '../ui/HomePage/Testimonials/Test';

function HomePage() {
  return (
    <div className="overflow-x: auto; overflow-y: unset;">
      <Header />
      <Features />
      <Test />
    </div>
  );
}

export default HomePage;
