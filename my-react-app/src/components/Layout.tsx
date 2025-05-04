import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Sidebar } from './Sidebar';
import { CustomerSidebar } from './CustomerSidebar';

interface LayoutProps {
  isCustomer?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isCustomer = false }) => {
  const showSidebar = isCustomer;

  return (
    <div className="flex min-h-screen bg-background">
      {showSidebar && (
        <div className="fixed top-0 left-0 h-full z-10 w-72">
          <CustomerSidebar />
        </div>
      )}

      <div className={`flex flex-col flex-1 ${showSidebar ? 'ml-72' : ''}`}>
        {!isCustomer && <NavBar />}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
