import Header from '../ui/WithoutProtected/Header/Header';
import Features from '../ui/WithoutProtected/HomePage/Features/Features';
import Footer from '../ui/WithoutProtected/HomePage/Footer/Footer';
import Issue from '../ui/WithoutProtected/HomePage/Footer/Issue';
import Testimonials from '../ui/WithoutProtected/HomePage/Testimonials/Testimonials';
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
