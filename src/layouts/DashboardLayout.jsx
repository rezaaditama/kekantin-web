const DashboardLayout = ({ navbar, children, footer }) => {
  return (
    <div className='bg-gray-50 text-gray-900'>
      {navbar}
      <main className='pt-4 pb-12 px-6 max-w-7xl mx-auto'>{children}</main>
      {footer}
    </div>
  );
};

export default DashboardLayout;
