import React from 'react';
import { Shield, Lock, Key, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSystems } from '../hooks/useSystems';

export const Security: React.FC = () => {
  const { isDark } = useTheme();
  const { systems } = useSystems();
  
  const securityStats = {
    diskEncryption: systems.filter(s => s.disk_encrypted).length,
    osUpdated: systems.filter(s => s.os_updated).length,
    antivirusActive: systems.filter(s => s.antivirus_active).length,
    compliantSleep: systems.filter(s => s.inactivity_sleep <= 10).length,
    total: systems.length
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Security Overview</h1>
        <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Monitor and manage security compliance across your systems
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-6 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${
              isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <Shield className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Disk Encryption</h2>
              <p className="mt-1 text-3xl font-semibold">
                {securityStats.total > 0 ? Math.round((securityStats.diskEncryption / securityStats.total) * 100) : 0}%
              </p>
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
              <Lock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">OS Updates</h2>
              <p className="mt-1 text-3xl font-semibold">
                {securityStats.total > 0 ? Math.round((securityStats.osUpdated / securityStats.total) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${
              isDark ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-600'
            }`}>
              <Key className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Antivirus</h2>
              <p className="mt-1 text-3xl font-semibold">
                {securityStats.total > 0 ? Math.round((securityStats.antivirusActive / securityStats.total) * 100) : 0}%
              </p>
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
              <h2 className="text-lg font-medium">Sleep Policy</h2>
              <p className="mt-1 text-3xl font-semibold">
                {securityStats.total > 0 ? Math.round((securityStats.compliantSleep / securityStats.total) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} px-4 py-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-lg font-medium">Security Compliance Details</h3>
        </div>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {systems.map((system) => (
            <div key={system.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{system.hostname}</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{system.os}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Shield className={`h-5 w-5 ${system.disk_encrypted ? 'text-green-500' : 'text-red-500'}`} />
                  </div>
                  <div className="flex items-center">
                    <Lock className={`h-5 w-5 ${system.os_updated ? 'text-green-500' : 'text-red-500'}`} />
                  </div>
                  <div className="flex items-center">
                    <Key className={`h-5 w-5 ${system.antivirus_active ? 'text-green-500' : 'text-red-500'}`} />
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className={`h-5 w-5 ${system.inactivity_sleep <= 10 ? 'text-green-500' : 'text-red-500'}`} />
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
