import Header from '../ui/Header/Header';
import Features from '../ui/HomePage/Features/Features';
import Footer from '../ui/HomePage/Footer/Footer';
import Issue from '../ui/HomePage/Footer/Issue';
import Testimonials from '../ui/HomePage/Testimonials/Testimonials';

function HomePage() {
  return (
    <div className="overflow-x: auto; overflow-y: unset;">
      <Header />
      <Features />
      <Testimonials />
      <Footer />
      <Issue />
    </div>
  );
}

export default HomePage;
