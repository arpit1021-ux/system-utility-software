import React from 'react';
import { AlertTriangle, Shield, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
// import { mockSystemData } from '../data/mockData';
import { useSystems } from '../hooks/useSystems';

export const Alerts: React.FC = () => {
  const { isDark } = useTheme();
  const { systems } = useSystems();

  const alerts = systems
    .map(system => {
      const issues = [];
      if (!system.DiskEncrypted) {
        issues.push({
          id: `${system.id}-disk`,
          type: 'critical',
          title: 'Disk Encryption Disabled',
          message: `${system.Hostname} has disk encryption disabled`,
          icon: Shield,
          timestamp: new Date().toISOString(),
          system
        });
      }
      if (!system.OSUpdated) {
        issues.push({
          id: `${system.id}-os`,
          type: 'warning',
          title: 'OS Update Required',
          message: `${system.Hostname} requires operating system update`,
          icon: AlertTriangle,
          timestamp: new Date().toISOString(),
          system
        });
      }
      if (!system.AntivirusActive) {
        issues.push({
          id: `${system.id}-av`,
          type: 'critical',
          title: 'Antivirus Inactive',
          message: `${system.Hostname} antivirus is not running`,
          icon: Shield,
          timestamp: new Date().toISOString(),
          system
        });
      }
      if (system.InactivitySleep > 10) {
        issues.push({
          id: `${system.id}-sleep`,
          type: 'warning',
          title: 'Sleep Timeout Too Long',
          message: `${system.Hostname} sleep timeout exceeds recommended 10 minutes`,
          icon: Clock,
          timestamp: new Date().toISOString(),
          system
        });
      }
      return issues;
    })
    .flat()
    .sort((a, b) => {
      if (a.type === 'critical' && b.type !== 'critical') return -1;
      if (a.type !== 'critical' && b.type === 'critical') return 1;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Alerts</h1>
        <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Monitor and manage system alerts across your organization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Total Alerts</h2>
            <span className="text-2xl font-bold">{alerts.length}</span>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Critical</h2>
            <span className="text-2xl font-bold text-red-500">
              {alerts.filter(a => a.type === 'critical').length}
            </span>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Warnings</h2>
            <span className="text-2xl font-bold text-amber-500">
              {alerts.filter(a => a.type === 'warning').length}
            </span>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Systems Affected</h2>
            <span className="text-2xl font-bold">
              {new Set(alerts.map(a => a.system.id)).size}
            </span>
          </div>
        </div>
      </div>

      <div className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div 
                key={alert.id}
                className={`p-4 border-b ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                } last:border-0`}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-2 rounded-full ${
                    alert.type === 'critical'
                      ? isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-100 text-red-600'
                      : isDark ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-100 text-amber-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{alert.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        alert.type === 'critical'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
                      }`}>
                        {alert.type === 'critical' ? 'Critical' : 'Warning'}
                      </span>
                    </div>
                    <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {alert.message}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                      <button className={`text-sm font-medium ${
                        isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      }`}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};