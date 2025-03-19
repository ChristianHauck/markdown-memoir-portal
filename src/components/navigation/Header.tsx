
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <header className="border-b bg-background flex items-center justify-between px-6 py-3 h-16">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <Link to="/" className="font-bold text-xl">Extra-Corporal Memory</Link>
      </div>
      <div>
        <Button 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => navigate('/editor/new')}
        >
          <Plus className="h-4 w-4" />
          <span>New Entry</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
