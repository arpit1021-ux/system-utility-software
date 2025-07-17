import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  RefreshCw, 
  Clock, 
  Check, 
  X, 
  MoreVertical,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
// import { mockSystemData } from '../data/mockData';
import { useSystems } from '../hooks/useSystems';
import { useTheme } from '../context/ThemeContext';

export const SystemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { systems } = useSystems();
  const [activeTab, setActiveTab] = useState('overview');
  
  const system = systems.find(sys => sys.id === id);
  
  if (!system) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold mb-4">System Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  const securityIssues = [
    !system.DiskEncrypted && { 
      id: 'disk', 
      title: 'Disk Encryption Disabled', 
      description: 'Enable FileVault or BitLocker to encrypt your disk and protect sensitive data.',
      severity: 'Critical',
      icon: <Shield />
    },
    !system.OSUpdated && { 
      id: 'OS', 
      title: 'Operating System Outdated', 
      description: 'Update to the latest version to ensure security patches are applied.',
      severity: 'Warning',
      icon: <RefreshCw />
    },
    !system.AntivirusActive && { 
      id: 'av', 
      title: 'Antivirus Inactive', 
      description: 'Enable your antivirus software to protect against malware and viruses.',
      severity: 'Critical',
      icon: <Shield />
    },
    system.InactivitySleep > 10 && { 
      id: 'sleep', 
      title: 'Sleep Timeout Too Long', 
      description: 'Set sleep timeout to 10 minutes or less to secure your system when inactive.',
      severity: 'Warning',
      icon: <Clock />
    },
  ].filter(Boolean);
  
  const hasIssues = securityIssues.length > 0;
  const hasCriticalIssues = securityIssues.some(issue => issue && issue.severity === 'Critical');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/')}
            className={`p-1 rounded-md ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} mr-3`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              {system.Hostname}
              {hasCriticalIssues ? (
                <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                  Critical Issues
                </span>
              ) : hasIssues ? (
                <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                  Warnings
                </span>
              ) : (
                <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  Healthy
                </span>
              )}
            </h1>
            <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Last checked {system.last_checkin} • {system.OS} {system.OSVersion}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            isDark 
              ? 'bg-blue-800 text-white hover:bg-blue-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Run Check Now
          </button>
          <div className="relative">
            <button className={`p-2 rounded-md ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
        <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <nav className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'overview'
                  ? `border-b-2 ${isDark ? 'border-blue-400 text-blue-400' : 'border-blue-500 text-blue-600'}`
                  : isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'security'
                  ? `border-b-2 ${isDark ? 'border-blue-400 text-blue-400' : 'border-blue-500 text-blue-600'}`
                  : isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'history'
                  ? `border-b-2 ${isDark ? 'border-blue-400 text-blue-400' : 'border-blue-500 text-blue-600'}`
                  : isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              History
            </button>
          </nav>
        </div>
        
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-4`}>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">System Information</h3>
                <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <dl className="grid grid-cols-1 gap-y-4">
                    <div>
                      <dt className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Hostname</dt>
                      <dd className="mt-1 text-sm font-medium">{system.Hostname}</dd>
                    </div>
                    <div>
                      <dt className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>IP Address</dt>
                      <dd className="mt-1 text-sm font-medium">{system.IP}</dd>
                    </div>
                    <div>
                      <dt className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Operating System</dt>
                      <dd className="mt-1 text-sm font-medium">{system.OS} {system.OSVersion}</dd>
                    </div>
                    <div>
                      <dt className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Model</dt>
                      <dd className="mt-1 text-sm font-medium">{system.Model}</dd>
                    </div>
                    <div>
                      <dt className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Serial Number</dt>
                      <dd className="mt-1 text-sm font-medium">{system.SerialNumber}</dd>
                    </div>
                    <div>
                      <dt className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>User</dt>
                      <dd className="mt-1 text-sm font-medium">{system.User}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Hardware</h3>
                <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
                  <dl className="grid grid-cols-1 gap-y-4">
                    <div>
                      <dt className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Processor</dt>
                      <dd className="mt-1 text-sm font-medium">{system.Processor}</dd>
                    </div>
                    <div>
                      <dt className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Memory</dt>
                      <dd className="mt-1 text-sm font-medium">{system.Memory} GB</dd>
                    </div>
                    <div>
                      <dt className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Disk Space</dt>
                      <dd className="mt-1 text-sm font-medium">500 GB (78% used)</dd>
                    </div>
                  </dl>
                </div>
                
                <h3 className="text-lg font-medium mb-4">Security Status</h3>
                <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-3" />
                        <span>Disk Encryption</span>
                      </div>
                      {system.DiskEncrypted ? (
                        <span className="text-green-500"><Check className="h-5 w-5" /></span>
                      ) : (
                        <span className="text-red-500"><X className="h-5 w-5" /></span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <RefreshCw className="h-5 w-5 mr-3" />
                        <span>OS Updates</span>
                      </div>
                      {system.OSUpdated ? (
                        <span className="text-green-500"><Check className="h-5 w-5" /></span>
                      ) : (
                        <span className="text-amber-500"><X className="h-5 w-5" /></span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-3" />
                        <span>Antivirus</span>
                      </div>
                      {system.AntivirusActive ? (
                        <span className="text-green-500"><Check className="h-5 w-5" /></span>
                      ) : (
                        <span className="text-red-500"><X className="h-5 w-5" /></span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3" />
                        <span>Sleep Timeout</span>
                      </div>
                      {system.InactivitySleep <= 10 ? (
                        <span className="text-green-500">{system.InactivitySleep} min</span>
                      ) : (
                        <span className="text-amber-500">{system.InactivitySleep} min</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div>
              {securityIssues.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security Issues</h3>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {securityIssues.map(issue => (
                      issue && (
                                <div key={issue.id} className="py-4">
                                  <div className="flex">
                                    <div className={`flex-shrink-0 ${
                                      issue.severity === 'Critical'
                                        ? 'text-red-500'
                                        : 'text-amber-500'
                                    }`}>
                                      <AlertTriangle className="h-6 w-6" />
                                    </div>
                                    <div className="ml-3 flex-1">
                                      <div className="flex items-center justify-between">
                                        <h4 className="text-base font-medium">
                                          {issue.title}
                                          <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                                            issue.severity === 'Critical'
                                              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
                                          }`}>
                                            {issue.severity}
                                          </span>
                                        </h4>
                                        <button className={`
                                          text-sm font-medium px-3 py-1 rounded-md
                                          ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}
                                        `}>
                                          Fix Issue
                                        </button>
                                      </div>
                                      <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {issue.description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )
                            )
                          )
                        }
                  </div>
                </div>
              ) : (
                <div className={`p-6 text-center border border-green-200 rounded-lg ${
                  isDark ? 'bg-green-900/10' : 'bg-green-50'
                }`}>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20">
                    <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-green-600 dark:text-green-400">All Security Checks Passed</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    This system meets all security requirements and is properly protected.
                  </p>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Security Recommendations</h3>
                <ul className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
                  <li className={`p-4 flex items-center justify-between ${
                    isDark ? 'border-gray-700' : 'border-gray-200'
                  } border-b`}>
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-3 text-green-500" />
                      <span>Enable automatic updates</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </li>
                  <li className={`p-4 flex items-center justify-between ${
                    isDark ? 'border-gray-700' : 'border-gray-200'
                  } border-b`}>
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-3 text-green-500" />
                      <span>Use strong, unique passwords</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </li>
                  <li className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-3 text-green-500" />
                      <span>Enable two-factor authentication</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div>
              <h3 className="text-lg font-medium mb-4">System Check History</h3>
              <div className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className={isDark ? 'bg-gray-700/50' : 'bg-gray-50'}>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Changes
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Today, 10:15 AM
                        </td>
                        <td className="px-6 py-4 text-sm">
                          Regular check-in
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                            Warning
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Yesterday, 4:32 PM
                        </td>
                        <td className="px-6 py-4 text-sm">
                          OS updated to latest version
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                            Warning
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Yesterday, 9:15 AM
                        </td>
                        <td className="px-6 py-4 text-sm">
                          Regular check-in
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                            Warning
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Jun 23, 2:45 PM
                        </td>
                        <td className="px-6 py-4 text-sm">
                          Sleep timeout changed to {system.InactivitySleep} minutes
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                            Critical
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Jun 22, 10:22 AM
                        </td>
                        <td className="px-6 py-4 text-sm">
                          Antivirus disabled
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            Healthy
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};