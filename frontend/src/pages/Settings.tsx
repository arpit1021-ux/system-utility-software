import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Bell, RefreshCw, Clock, Shield, Server, Monitor } from 'lucide-react';

export const Settings: React.FC = () => {
  const { isDark } = useTheme();
  const [checkFrequency, setCheckFrequency] = useState('30');
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Configure your system monitoring preferences
        </p>
      </div>
      
      <div className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} px-4 py-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className="text-lg font-medium">Monitoring Settings</h2>
        </div>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 space-y-6`}>
          <div>
            <label htmlFor="check-frequency" className="block text-sm font-medium">
              Check Frequency
            </label>
            <div className="mt-1 flex items-center">
              <select
                id="check-frequency"
                value={checkFrequency}
                onChange={(e) => setCheckFrequency(e.target.value)}
                className={`block w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-base sm:text-sm border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                }`}
              >
                <option value="15">Every 15 minutes</option>
                <option value="30">Every 30 minutes</option>
                <option value="60">Every hour</option>
              </select>
              <div className="ml-3">
                <RefreshCw className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>
            <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              How often the system utility should check for changes
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="flex items-center text-sm font-medium">
                <Bell className="h-5 w-5 mr-2" />
                Enable Alerts
              </span>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Receive notifications about system issues
              </p>
            </div>
            <div className="relative inline-block w-12 h-6 mr-2">
              <input
                type="checkbox"
                id="alerts-toggle"
                checked={alertsEnabled}
                onChange={() => setAlertsEnabled(!alertsEnabled)}
                className="sr-only"
              />
              <label
                htmlFor="alerts-toggle"
                className={`absolute inset-0 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                  alertsEnabled ? 'bg-blue-600' : isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 bg-white h-5 w-5 rounded-full transition-transform duration-200 ease-in-out ${
                    alertsEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`${alertsEnabled ? '' : 'opacity-50 pointer-events-none'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} px-4 py-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className="text-lg font-medium">Alert Preferences</h2>
        </div>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 space-y-6`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="flex items-center text-sm font-medium">
                Email Alerts
              </span>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Receive security alerts via email
              </p>
            </div>
            <div className="relative inline-block w-12 h-6 mr-2">
              <input
                type="checkbox"
                id="email-toggle"
                checked={emailAlerts}
                onChange={() => setEmailAlerts(!emailAlerts)}
                className="sr-only"
              />
              <label
                htmlFor="email-toggle"
                className={`absolute inset-0 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                  emailAlerts ? 'bg-blue-600' : isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 bg-white h-5 w-5 rounded-full transition-transform duration-200 ease-in-out ${
                    emailAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="flex items-center text-sm font-medium">
                Push Notifications
              </span>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Receive alerts as push notifications
              </p>
            </div>
            <div className="relative inline-block w-12 h-6 mr-2">
              <input
                type="checkbox"
                id="push-toggle"
                checked={pushAlerts}
                onChange={() => setPushAlerts(!pushAlerts)}
                className="sr-only"
              />
              <label
                htmlFor="push-toggle"
                className={`absolute inset-0 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                  pushAlerts ? 'bg-blue-600' : isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 bg-white h-5 w-5 rounded-full transition-transform duration-200 ease-in-out ${
                    pushAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="alert-level" className="block text-sm font-medium mb-1">
              Alert Severity Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div className={`cursor-pointer border rounded-md px-3 py-2 flex items-center justify-center bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800`}>
                <span className={`text-sm font-medium text-blue-700 dark:text-blue-400`}>All Issues</span>
              </div>
              <div className={`cursor-pointer border rounded-md px-3 py-2 flex items-center justify-center ${
                isDark ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-700'
              } hover:bg-gray-50 dark:hover:bg-gray-600`}>
                <span className="text-sm font-medium">Warnings</span>
              </div>
              <div className={`cursor-pointer border rounded-md px-3 py-2 flex items-center justify-center ${
                isDark ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-700'
              } hover:bg-gray-50 dark:hover:bg-gray-600`}>
                <span className="text-sm font-medium">Critical Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} px-4 py-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className="text-lg font-medium">Security Checks</h2>
        </div>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}>
          <div className={`border ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
            <div className="space-y-1">
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center">
                  <Shield className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
                  <span>Disk Encryption</span>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id="disk-toggle"
                    checked={true}
                    className="sr-only"
                    readOnly
                  />
                  <label
                    htmlFor="disk-toggle"
                    className={`absolute inset-0 rounded-full cursor-pointer bg-blue-600`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 bg-white h-5 w-5 rounded-full transform translate-x-6`}
                    />
                  </label>
                </div>
              </div>
              
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center">
                  <RefreshCw className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
                  <span>OS Updates</span>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id="os-toggle"
                    checked={true}
                    className="sr-only"
                    readOnly
                  />
                  <label
                    htmlFor="os-toggle"
                    className={`absolute inset-0 rounded-full cursor-pointer bg-blue-600`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 bg-white h-5 w-5 rounded-full transform translate-x-6`}
                    />
                  </label>
                </div>
              </div>
              
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center">
                  <Shield className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
                  <span>Antivirus Status</span>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id="av-toggle"
                    checked={true}
                    className="sr-only"
                    readOnly
                  />
                  <label
                    htmlFor="av-toggle"
                    className={`absolute inset-0 rounded-full cursor-pointer bg-blue-600`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 bg-white h-5 w-5 rounded-full transform translate-x-6`}
                    />
                  </label>
                </div>
              </div>
              
              <div className={`flex items-center justify-between p-4`}>
                <div className="flex items-center">
                  <Clock className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
                  <span>Sleep Settings</span>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id="sleep-toggle"
                    checked={true}
                    className="sr-only"
                    readOnly
                  />
                  <label
                    htmlFor="sleep-toggle"
                    className={`absolute inset-0 rounded-full cursor-pointer bg-blue-600`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 bg-white h-5 w-5 rounded-full transform translate-x-6`}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <button className={`px-4 py-2 rounded-md text-sm font-medium ${isDark ? 'bg-blue-800 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'} mr-3`}>
              Add Custom Check
            </button>
            <button className={`px-4 py-2 rounded-md text-sm font-medium ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} flex items-center`}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className={`px-4 py-2 rounded-md text-sm font-medium ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} mr-3`}>
          Cancel
        </button>
        <button className={`px-4 py-2 rounded-md text-sm font-medium ${isDark ? 'bg-blue-800 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          Save Settings
        </button>
      </div>
    </div>
  );
};