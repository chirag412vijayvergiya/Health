import HomePage from '../pages/HomePage';
import Header from './Header/Header';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div className="bg-grey-900 font-sans">
      {/* <Header />
      <Sidebar /> */}
      <HomePage />
    </div>
  );
}

export default AppLayout;
