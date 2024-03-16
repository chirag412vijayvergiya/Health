import HomePage from '../pages/HomePage';
import Header from './Header/Header';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div className="font-sans dark:bg-grey-900">
      {/* <Header />
      <Sidebar /> */}
      <HomePage />
    </div>
  );
}

export default AppLayout;
