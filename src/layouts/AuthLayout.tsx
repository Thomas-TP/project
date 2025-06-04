import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { Brain } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-10 bg-gradient-to-br from-primary/80 to-accent/80 text-white">
        <div>
          <Link to="/" className="inline-flex items-center space-x-2">
            <Brain className="w-8 h-8" />
            <span className="text-xl font-bold">SereniTest</span>
          </Link>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Nurture your mental well-being</h1>
          <p className="text-xl">
            Track your daily mental state, practice guided meditation, and follow
            breathing exercises to improve your overall wellness.
          </p>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span>Daily assessments</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span>Guided practices</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span>Progress tracking</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm opacity-80">
            &copy; {new Date().getFullYear()} SereniTest. All rights reserved.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex items-center justify-between p-4">
          <div className="lg:hidden">
            <Link to="/" className="inline-flex items-center space-x-2">
              <Brain className="w-6 h-6" />
              <span className="text-lg font-bold">SereniTest</span>
            </Link>
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;