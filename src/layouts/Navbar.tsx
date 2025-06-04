import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Brain, Menu, X, BarChart, Flame, ListChecks, User, Crown } from 'lucide-react';
import { useSupabase } from '../lib/supabase/SupabaseProvider';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { Button } from '../components/ui/Button';

const Navbar: React.FC = () => {
  const { user, signOut } = useSupabase();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAppRoute = location.pathname.startsWith('/app');

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Dashboard', href: '/app/dashboard', icon: BarChart },
    { name: 'Daily Test', href: '/app/test', icon: ListChecks },
    { name: 'Breathing', href: '/app/breathing', icon: Flame },
    { name: 'Meditation', href: '/app/meditation', icon: Brain },
    { name: 'Profile', href: '/app/profile', icon: User },
    { name: 'Subscription', href: '/app/subscription', icon: Crown },
  ];

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Brain className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">SereniTest</span>
            </Link>
            
            {!isAppRoute && (
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                      isActive
                        ? 'border-primary text-foreground'
                        : 'border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground'
                    }`
                  }
                >
                  Home
                </NavLink>
              </div>
            )}

            {isAppRoute && (
              <div className="hidden md:ml-8 md:flex md:space-x-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`
                    }
                  >
                    <item.icon className="mr-1.5 h-4 w-4" />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
            
            {user ? (
              <div className="hidden md:ml-4 md:flex md:items-center">
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}

            <div className="ml-4 flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {isAppRoute ? (
            navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `block px-3 py-2 text-base font-medium rounded-md ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </div>
              </NavLink>
            ))
          ) : (
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:bg-muted hover:border-muted-foreground/50 hover:text-foreground'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          )}
        </div>

        {user ? (
          <div className="pt-4 pb-3 border-t border-border">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={handleSignOut}
                className="block px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted w-full text-left"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-3 border-t border-border">
            <div className="flex flex-col space-y-3 px-4">
              <Link
                to="/auth/login"
                className="block text-center py-2 text-base font-medium rounded-md border border-input hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/auth/register"
                className="block text-center py-2 text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;