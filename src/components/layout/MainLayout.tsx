
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../navigation/Sidebar';
import Header from '../navigation/Header';
import Footer from './Footer';
import { SidebarProvider } from '@/components/ui/sidebar';

const MainLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Header />
        <div className="flex flex-1 w-full">
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto flex flex-col">
            <div className="max-w-4xl mx-auto w-full flex-1">
              <Outlet />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
