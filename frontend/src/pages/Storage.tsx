import React from 'react';
import { HardDrive, Database, Server } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSystems } from '../hooks/useSystems';

export const Storage: React.FC = () => {
  const { isDark } = useTheme();
  const { systems } = useSystems();

  const storageData = systems.map(system => ({
    name: system.hostname,
    total: system.disk_total_gb,
    used: system.disk_used_gb,
  })).filter(d => d.total > 0);

  const totalStorage = storageData.reduce((acc, curr) => acc + curr.total, 0);
  const usedStorage = storageData.reduce((acc, curr) => acc + curr.used, 0);
  const averageUsage = totalStorage > 0 ? Math.round((usedStorage / totalStorage) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Storage Management</h1>
        <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Monitor storage usage across all systems
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-6 rounded-lg border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${
              isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <HardDrive className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Total Storage</h2>
              <p className="mt-1 text-3xl font-semibold">
                {systems.length > 0 ? `${totalStorage} GB` : 'No data'}
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
              <Database className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Used Storage</h2>
              <p className="mt-1 text-3xl font-semibold">
                {systems.length > 0 ? `${usedStorage} GB` : 'No data'}
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
              <Server className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Average Usage</h2>
              <p className="mt-1 text-3xl font-semibold">
                {systems.length > 0 ? `${averageUsage}%` : 'No data'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} px-4 py-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-lg font-medium">Storage Usage by System</h3>
        </div>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-4`}>
          {systems.length > 0 ? (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={storageData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="name" 
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                    tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
                  />
                  <YAxis 
                    stroke={isDark ? '#9ca3af' : '#6b7280'}
                    tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#1f2937' : '#ffffff',
                      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '0.375rem',
                    }}
                    formatter={(value: number) => [`${value} GB`]}
                  />
                  <Bar dataKey="used" fill="#3b82f6" name="Used" />
                  <Bar dataKey="total" fill="#93c5fd" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center">
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                No system data available. Run the agent to collect storage info.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
