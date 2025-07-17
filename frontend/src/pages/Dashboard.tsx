import React, { useState } from 'react';
import { 
  Shield, 
  AlertCircle, 
  HardDrive, 
  Clock, 
  Server, 
  RefreshCw,
  ChevronDown,
  Download
} from 'lucide-react';
import {DownloadConfigButton} from '../components/dashboard/DownloadConfigButton'
import { SystemCard } from '../components/dashboard/SystemCard';
import { StatusSummary } from '../components/dashboard/StatusSummary';
import { SystemList } from '../components/dashboard/SystemList';
import { useTheme } from '../context/ThemeContext';
import { useSystems } from '../hooks/useSystems';



export const Dashboard: React.FC = () => {
  const { isDark } = useTheme();
  const { systems, loading, error } = useSystems();
  const [timeRange, setTimeRange] = useState('24h');
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Calculate summary statistics
  const totalSystems = systems.length;

  const systemsWithIssues = systems.filter(system => 
    !system.DiskEncrypted || 
    !system.OSUpdated || 
    !system.AntivirusActive || 
    system.InactivitySleep > 10
  ).length;
  const criticalIssues = systems.filter(system => 
    !system.DiskEncrypted || !system.AntivirusActive
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">System Health Dashboard</h1>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Monitor and manage system health across your organization
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusSummary 
          title="Total Systems"
          value={totalSystems}
          icon={<Server />}
          trend="+2"
          trendUp={true}
          color="blue"
        />
        <StatusSummary 
          title="Systems with Issues"
          value={systemsWithIssues}
          icon={<AlertCircle />}
          trend="-3"
          trendUp={false}
          color="amber"
        />
        <StatusSummary 
          title="Critical Issues"
          value={criticalIssues}
          icon={<Shield />}
          trend="+1"
          trendUp={true}
          color="red"
        />
        <StatusSummary 
          title="Avg. Last Check"
          value="23m"
          icon={<Clock />}
          trend="-5m"
          trendUp={false}
          color="green"
        />
      </div>

      <div className={`${!isDark ? 'bg-white' : 'dark:bg-gray-800' } rounded-lg shadow overflow-hidden`}>
        <div className="border-b dark:border-gray-700">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('issues')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'issues'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Issues ({systemsWithIssues})
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'alerts'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Alerts ({criticalIssues})
            </button>
          </nav>
        </div>
        <div className="p-4">
          <SystemList 
            systems={activeTab === 'overview' 
              ? systems 
              : activeTab === 'issues' 
                ? systems.filter(sys => 
                    !sys.DiskEncrypted || 
                    !sys.OSUpdated || 
                    !sys.AntivirusActive || 
                    sys.InactivitySleep > 10)
                : systems.filter(sys => 
                    !sys.DiskEncrypted || !sys.AntivirusActive)
            } 
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">System Health Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SystemCard 
            title="Disk Encryption" 
            icon={<Shield />}
            status={systems.filter(sys => sys.DiskEncrypted).length}
            total={totalSystems}
            color="blue"
          />
          <SystemCard 
            title="OS Updates" 
            icon={<RefreshCw />}
            status={systems.filter(sys => sys.OSUpdated).length}
            total={totalSystems}
            color="teal"
          />
          <SystemCard 
            title="Antivirus Status" 
            icon={<Shield />}
            status={systems.filter(sys => sys.AntivirusActive).length}
            total={totalSystems}
            color="emerald"
          />
          <SystemCard 
            title="Sleep Settings" 
            icon={<Clock />}
            status={systems.filter(sys => sys.InactivitySleep <= 10).length}
            total={totalSystems}
            color="amber"
          />
          <SystemCard 
            title="macOS Systems" 
            icon={<Server />}
            status={systems.filter(sys => sys.OS === 'macOS').length}
            total={totalSystems}
            color="indigo"
          />
          <SystemCard 
            title="Windows Systems" 
            icon={<Server />}
            status={systems.filter(sys => sys.OS === 'Windows').length}
            total={totalSystems}
            color="purple"
          />
        </div>
      </div>
    </div>
  );
};