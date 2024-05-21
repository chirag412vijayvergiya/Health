import MainHeader from './WithoutProtected/Header/MainHeader';

function MainLayout({ children }) {
  return (
    <div>
      <MainHeader />
      <main>{children}</main>
      {/* You can include other common elements like a footer here */}
    </div>
  );
}

export default MainLayout;
