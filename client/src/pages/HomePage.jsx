import Header from '../ui/WithoutProtected/Header/Header';
import Features from '../ui/WithoutProtected/HomePage/Features/Features';
import Footer from '../ui/WithoutProtected/HomePage/Footer/Footer';
import Issue from '../ui/WithoutProtected/HomePage/Footer/Issue';
import Testimonials from '../ui/WithoutProtected/HomePage/Testimonials/Testimonials';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import SEO from '../ui/SEO.jsx';
function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userRole = params.get('userRole');

    if (userRole) {
      Cookies.set('userRole', userRole, {
        expires: 90,
        sameSite: 'None',
        secure: process.env.NODE_ENV === 'production',
      });
      // Optionally, remove the query parameter from the URL
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);
  return (
    <div className="overflow-x: auto; overflow-y: unset;">
      <SEO
        title="Home"
        description="This is the home page of the website."
        keywords="home, page, keywords"
        author="Chirag Vijayvergiya"
      />
      <Header />
      <Features />
      <Testimonials />
      <Footer />
      <Issue />
    </div>
  );
}

export default HomePage;
