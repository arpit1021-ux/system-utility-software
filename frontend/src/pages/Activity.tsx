import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
// import { mockSystemData } from '../data/mockData';
import { useSystems } from '../hooks/useSystems';
import { Clock, AlertTriangle, Shield, RefreshCw, ChevronDown,  } from 'lucide-react';
import { DownloadConfigButton } from '../components/dashboard/DownloadConfigButton';

interface ActivityLog {
  id: string;
  timestamp: string;
  system: string;
  event: string;
  type: 'info' | 'warning' | 'critical';
  details: string;
}

export const Activity: React.FC = () => {
  const { isDark } = useTheme();
  const { systems } = useSystems();
  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'warning' | 'critical'>('all');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Generate mock activity logs based on system data
  const activityLogs: ActivityLog[] = systems.flatMap(system => {
    const logs: ActivityLog[] = [];
    
    if (!system.DiskEncrypted) {
      logs.push({
        id: `${system.id}-disk`,
        timestamp: '2 hours ago',
        system: system.Hostname,
        event: 'Disk Encryption Check',
        type: 'critical',
        details: 'Disk encryption is disabled'
      });
    }
    
    if (!system.OSUpdated) {
      logs.push({
        id: `${system.id}-os`,
        timestamp: '3 hours ago',
        system: system.Hostname,
        event: 'OS Update Check',
        type: 'warning',
        details: 'Operating system requires updates'
      });
    }
    
    if (!system.AntivirusActive) {
      logs.push({
        id: `${system.id}-av`,
        timestamp: '1 hour ago',
        system: system.Hostname,
        event: 'Antivirus Check',
        type: 'critical',
        details: 'Antivirus is not active'
      });
    }
    
    if (system.InactivitySleep > 15) {
      logs.push({
        id: `${system.id}-sleep`,
        timestamp: '4 hours ago',
        system: system.Hostname,
        event: 'Sleep Settings Check',
        type: 'warning',
        details: `Sleep timeout is set to ${system.InactivitySleep} minutes`
      });
    }
    
    return logs;
  }).sort((a, b) => {
    // Sort by timestamp (mock sorting since we're using relative times)
    const timeA = a.timestamp.includes('hour') ? parseInt(a.timestamp) : 24;
    const timeB = b.timestamp.includes('hour') ? parseInt(b.timestamp) : 24;
    return timeA - timeB;
  });

  const filteredLogs = activityLogs.filter(log => {
    if (filterType === 'all') return true;
    if (filterType === 'warning') return log.type === 'warning';
    if (filterType === 'critical') return log.type === 'critical';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Activity Log</h1>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Monitor system activity and security events
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
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Total Events</h2>
              <p className="mt-1 text-3xl font-semibold">{activityLogs.length}</p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${
              isDark ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-100 text-amber-600'
            }`}>
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Warnings</h2>
              <p className="mt-1 text-3xl font-semibold">
                {activityLogs.filter(log => log.type === 'warning').length}
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
              <Shield className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Critical Events</h2>
              <p className="mt-1 text-3xl font-semibold">
                {activityLogs.filter(log => log.type === 'critical').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} px-4 py-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Activity Events</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filterType === 'all'
                    ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('warning')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filterType === 'warning'
                    ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Warnings
              </button>
              <button
                onClick={() => setFilterType('critical')}
                className={`px-3 py-1 rounded-md text-sm ${
                  filterType === 'critical'
                    ? isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Critical
              </button>
            </div>
          </div>
        </div>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4">
              <div className="flex items-start">
                <div className={`flex-shrink-0 p-2 rounded-full ${
                  log.type === 'critical'
                    ? isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-100 text-red-600'
                    : isDark ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-100 text-amber-600'
                }`}>
                  {log.type === 'critical' ? <Shield className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-medium">{log.event}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      log.type === 'critical'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
                    }`}>
                      {log.type === 'critical' ? 'Critical' : 'Warning'}
                    </span>
                  </div>
                  <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {log.details}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {log.system}
                      </span>
                      <span className={`mx-2 text-sm ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
                      <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {log.timestamp}
                      </span>
                    </div>
                    <button className={`text-sm font-medium ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};