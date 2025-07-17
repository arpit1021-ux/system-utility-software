import React, { useState } from 'react';
import { Menu, Bell, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useSystems } from '../../hooks/useSystems';

export const Header: React.FC = () => {

  const { isDark, toggleTheme } = useTheme();
  const { systems } = useSystems();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: 'Critical Security Issue',
      message: 'Windows-laptop-05 has disk encryption disabled',
      time: '5 minutes ago',
      type: 'critical'
    },
    {
      id: 2,
      title: 'System Update Required',
      message: 'MacBook-air-08 requires OS update',
      time: '23 minutes ago',
      type: 'warning'
    },
    {
      id: 3,
      title: 'Antivirus Inactive',
      message: 'Ubuntu-desktop-03 antivirus is not running',
      time: '35 minutes ago',
      type: 'critical'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = systems.filter(system => 
      system.Hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.IP.includes(searchQuery) ||
      system.OS.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (results.length === 1) {
      navigate(`/system/${results[0].id}`);
    }
    // TODO: Show search results dropdown
  };

  return (
    <header className={`sticky top-0 z-10 ${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          >
            <Menu className={`w-6 h-6 ${isDark ? 'text-gray-200' : 'text-gray-600'}`} />
          </button>
        </div>
        
        <div className="flex-1 flex items-center justify-center md:justify-start">
          <form onSubmit={handleSearch} className={`relative max-w-md w-full hidden md:block`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 border rounded-md transition-colors duration-200 ease-in-out ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              placeholder="Search systems..."
            />
          </form>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-md ${!isDark ? 'hover:bg-gray-100' : 'hover:bg-gray-700'} focus:outline-none relative`}
            >
              <Bell className={`w-6 h-6 ${isDark ? 'text-gray-200' : 'text-gray-600'}`} />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border`}>
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`px-4 py-3 hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'} cursor-pointer`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <span className={`inline-block h-2 w-2 rounded-full ${
                              notification.type === 'critical' ? 'bg-red-500' : 'bg-amber-500'
                            }`}></span>
                          </div>
                          <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {notification.message}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <button className={`text-sm font-medium ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    } w-full text-center`}>
                      View all notifications
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-md ${!isDark ? 'hover:bg-gray-100' : 'hover:bg-gray-700'} focus:outline-none`}
          >
            {!isDark ? (
              <Sun className="w-6 h-6 text-yellow-300" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};