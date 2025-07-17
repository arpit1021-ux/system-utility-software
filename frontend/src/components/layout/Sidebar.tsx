import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Monitor, 
  Settings, 
  Shield, 
  HardDrive, 
  Clock, 
  AlertCircle,
  Server,
  LogOut
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { isDark } = useTheme();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard />, path: '/' },
    { name: 'Systems', icon: <Monitor />, path: '/systems' },
    { name: 'Alerts', icon: <AlertCircle />, path: '/alerts' },
    { name: 'Security', icon: <Shield />, path: '/security' },
    { name: 'Storage', icon: <HardDrive />, path: '/storage' },
    { name: 'Activity', icon: <Clock />, path: '/activity' },
    { name: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <aside 
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } md:flex flex-col fixed md:relative inset-y-0 z-20 ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } border-r ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      } transition-all duration-300 ease-in-out h-screen hidden`}
    >
      <div className={`flex items-center justify-between h-16 px-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} border-b`}>
        <div className="flex items-center">
          <Server className={`h-8 w-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          {!collapsed && <span className="ml-2 font-semibold text-xl">SystemPulse</span>}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1 rounded-md ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} focus:outline-none hidden md:block`}
        >
          <svg 
            className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {collapsed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            )}
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md ${
                    isActive 
                      ? `${isDark ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-800'}`
                      : `${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                  } transition-colors duration-150 ease-in-out`
                }
              >
                <span className={`${collapsed ? 'mx-auto' : ''}`}>
                  {React.cloneElement(item.icon, { 
                    className: `h-5 w-5 ${collapsed ? 'mx-auto' : ''}` 
                  })}
                </span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`p-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} border-t`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-semibold">
            A
          </div>
          {!collapsed && (
            <div className="ml-3 flex-1">
              <p className="font-medium">Admin User</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>admin@example.com</p>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className={`ml-2 p-2 rounded-md ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            title="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};