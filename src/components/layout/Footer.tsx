
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 border-t bg-background">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-2 md:mb-0">
          © {new Date().getFullYear()} Programming Memoir
        </div>
        <div className="flex space-x-4">
          <Link 
            to="/impressum" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Impressum
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
