import React, { useState } from 'react';
import { Check, X, AlertTriangle, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import type { SystemRow } from '../../hooks/useSystems';

interface SystemListProps {
  systems: SystemRow[];
}

export const SystemList: React.FC<SystemListProps> = ({ systems }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<keyof SystemRow>('Hostname');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  
  const handleSort = (field: keyof SystemRow) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedSystems = [...systems].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    }
    
    if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      return sortDirection === 'asc' 
        ? (valueA === valueB ? 0 : valueA ? -1 : 1)
        : (valueA === valueB ? 0 : valueA ? 1 : -1);
    }
    
    return 0;
  });
  
  const toggleExpandRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleRowClick = (system: SystemRow) => {
    navigate(`/system/${system.id}`);
  };
  
  const renderSortIcon = (field: keyof SystemRow) => {
    if (sortField !== field) return <ChevronDown className="h-4 w-4 opacity-50" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };
  
  const renderStatusIcon = (isActive: boolean) => {
    if (isActive) {
      return <Check className="h-5 w-5 text-green-500" />;
    } else {
      return <X className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className={isDark ? 'bg-gray-700/50' : 'bg-gray-50'}>
          <tr>
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">
              <button
                onClick={() => handleSort('Hostname')}
                className="flex items-center space-x-1 hover:text-blue-500"
              >
                <span>System</span>
                {renderSortIcon('Hostname')}
              </button>
            </th>
            <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider">
              <button
                onClick={() => handleSort('OS')}
                className="flex items-center space-x-1 hover:text-blue-500"
              >
                <span>OS</span>
                {renderSortIcon('OS')}
              </button>
            </th>
            <th scope="col" className="p-4 text-center text-xs font-medium uppercase tracking-wider">
              <button
                onClick={() => handleSort('DiskEncrypted')}
                className="flex items-center justify-center space-x-1 hover:text-blue-500"
              >
                <span>Disk Encryption</span>
                {renderSortIcon('DiskEncrypted')}
              </button>
            </th>
            <th scope="col" className="p-4 text-center text-xs font-medium uppercase tracking-wider">
              <button
                onClick={() => handleSort('OSUpdated')}
                className="flex items-center justify-center space-x-1 hover:text-blue-500"
              >
                <span>OS Updates</span>
                {renderSortIcon('OSUpdated')}
              </button>
            </th>
            <th scope="col" className="p-4 text-center text-xs font-medium uppercase tracking-wider">
              <button
                onClick={() => handleSort('AntivirusActive')}
                className="flex items-center justify-center space-x-1 hover:text-blue-500"
              >
                <span>Antivirus</span>
                {renderSortIcon('AntivirusActive')}
              </button>
            </th>
            <th scope="col" className="p-4 text-center text-xs font-medium uppercase tracking-wider">
              <button
                onClick={() => handleSort('InactivitySleep')}
                className="flex items-center justify-center space-x-1 hover:text-blue-500"
              >
                <span>Sleep (min)</span>
                {renderSortIcon('InactivitySleep')}
              </button>
            </th>
            <th scope="col" className="p-4 text-center text-xs font-medium uppercase tracking-wider">
              <button
                onClick={() => handleSort('last_checkin')}
                className="flex items-center justify-center space-x-1 hover:text-blue-500"
              >
                <span>Last Check</span>
                {renderSortIcon('last_checkin')}
              </button>
            </th>
            <th scope="col" className="p-4 text-center text-xs font-medium uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="p-4 text-center text-xs font-medium uppercase tracking-wider">
              <span className="sr-only">Expand</span>
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {sortedSystems.map((system) => {
            const isExpanded = !!expandedRows[system.id];
            const hasIssues = !system.DiskEncrypted || !system.OSUpdated || !system.AntivirusActive || system.InactivitySleep > 10;
            const hasCriticalIssues = !system.DiskEncrypted || !system.AntivirusActive;
            
            // console.log(system)

            return (
              <React.Fragment key={system.id}>
                <tr 
                  className={`${
                    isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                  } cursor-pointer transition duration-150`}
                  onClick={() => handleRowClick(system)}
                >
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-8 w-8 flex-shrink-0 rounded-full flex items-center justify-center ${
                        system.OS === 'macOS' 
                          ? isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                          : system.OS === 'Windows'
                            ? isDark ? 'bg-indigo-900/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                            : isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'
                      }`}>
                        {system.Hostname.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{system.Hostname}</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{system.IP}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      system.OS === 'macOS' 
                        ? isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-800'
                        : system.OS === 'Windows'
                          ? isDark ? 'bg-indigo-900/20 text-indigo-400' : 'bg-indigo-100 text-indigo-800'
                          : isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-800'
                    }`}>
                      {system.OS}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {renderStatusIcon(system.DiskEncrypted)}
                  </td>
                  <td className="p-4 text-center">
                    {renderStatusIcon(system.OSUpdated)}
                  </td>
                  <td className="p-4 text-center">
                    {renderStatusIcon(system.AntivirusActive)}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`${
                      system.InactivitySleep <= 10
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}>
                      {system.InactivitySleep}
                    </span>
                  </td>
                  <td className="p-4 text-center whitespace-nowrap">
                    {system.last_checkin}
                  </td>
                  <td className="p-4 text-center">
                    {hasCriticalIssues ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                        Critical
                      </span>
                    ) : hasIssues ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                        Warning
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Healthy
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpandRow(system.id);
                      }}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                </tr>
                {isExpanded && (
                  <tr className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-50/80'}`}>
                    <td colSpan={9} className="p-4">
                      <div className="text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">System Details</h4>
                            <p><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>User:</span> {system.User}</p>
                            <p><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Serial:</span> {system.SerialNumber}</p>
                            <p><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>OS Version:</span> {system.OSVersion}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Hardware</h4>
                            <p><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Model:</span> {system.Model}</p>
                            <p><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Processor:</span> {system.Processor}</p>
                            <p><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Memory:</span> {system.Memory} GB</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Security Status</h4>
                            <div className="space-y-1">
                              {!system.DiskEncrypted && (
                                <div className="flex items-center text-red-500">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  <span>Disk encryption is disabled</span>
                                </div>
                              )}
                              {!system.OSUpdated && (
                                <div className="flex items-center text-amber-500">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  <span>OS needs updating</span>
                                </div>
                              )}
                              {!system.AntivirusActive && (
                                <div className="flex items-center text-red-500">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  <span>Antivirus is inactive</span>
                                </div>
                              )}
                              {system.InactivitySleep > 10 && (
                                <div className="flex items-center text-amber-500">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  <span>Sleep timeout exceeds 10 minutes</span>
                                </div>
                              )}
                              {system.DiskEncrypted && system.OSUpdated && system.AntivirusActive && system.InactivitySleep <= 10 && (
                                <div className="flex items-center text-green-500">
                                  <Check className="h-4 w-4 mr-1" />
                                  <span>All security checks passed</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};