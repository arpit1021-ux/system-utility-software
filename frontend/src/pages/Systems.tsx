import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SystemList } from '../components/dashboard/SystemList';
// import { systems } from '../data/mockData';
import { useSystems } from '../hooks/useSystems';
import { Server, RefreshCw, ChevronDown } from 'lucide-react';
import { DownloadConfigButton } from '../components/dashboard/DownloadConfigButton';

export const Systems: React.FC = () => {
  const { isDark } = useTheme();
  const { systems } = useSystems();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [timeRange, setTimeRange] = React.useState('24h');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Systems Overview</h1>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Monitor and manage all registered systems
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`appearance-none pl-3 pr-8 py-2 rounded-md border ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="1h">Last hour</option>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 pointer-events-none" />
          </div>
          <button 
            onClick={handleRefresh}
            className={`p-2 rounded-md ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-100'
            } border ${
              isDark ? 'border-gray-700' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <DownloadConfigButton/>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-6 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${
              isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <Server className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Total Systems</h2>
              <p className="mt-1 text-3xl font-semibold">{systems.length}</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${
              isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'
            }`}>
              <Server className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Healthy Systems</h2>
              <p className="mt-1 text-3xl font-semibold">
                {systems.filter(sys => 
                  sys.DiskEncrypted && 
                  sys.OSUpdated && 
                  sys.AntivirusActive && 
                  sys.InactivitySleep <= 10
                ).length}
              </p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${
              isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-100 text-red-600'
            }`}>
              <Server className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Systems with Issues</h2>
              <p className="mt-1 text-3xl font-semibold">
                {systems.filter(sys => 
                  !sys.DiskEncrypted || 
                  !sys.OSUpdated || 
                  !sys.AntivirusActive || 
                  sys.InactivitySleep > 10
                ).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} px-4 py-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-lg font-medium">All Systems</h3>
        </div>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-4`}>
          <SystemList systems={systems} />
        </div>
      </div>
    </div>
  );
};