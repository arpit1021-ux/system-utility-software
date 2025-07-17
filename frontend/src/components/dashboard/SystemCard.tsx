import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface SystemCardProps {
  title: string;
  icon: React.ReactNode;
  status: number;
  total: number;
  color: string;
}

export const SystemCard: React.FC<SystemCardProps> = ({ 
  title, 
  icon, 
  status, 
  total,
  color = 'blue'
}) => {
  const { isDark } = useTheme();
  const percentage = Math.round((status / total) * 100);
  
  const getColorClasses = () => {
    const baseClasses = {
      blue: {
        light: 'bg-blue-100 text-blue-800',
        dark: 'bg-blue-900/30 text-blue-300',
        fill: 'bg-blue-500'
      },
      teal: {
        light: 'bg-teal-100 text-teal-800',
        dark: 'bg-teal-900/30 text-teal-300',
        fill: 'bg-teal-500'
      },
      emerald: {
        light: 'bg-emerald-100 text-emerald-800',
        dark: 'bg-emerald-900/30 text-emerald-300',
        fill: 'bg-emerald-500'
      },
      amber: {
        light: 'bg-amber-100 text-amber-800',
        dark: 'bg-amber-900/30 text-amber-300',
        fill: 'bg-amber-500'
      },
      red: {
        light: 'bg-red-100 text-red-800',
        dark: 'bg-red-900/30 text-red-300',
        fill: 'bg-red-500'
      },
      indigo: {
        light: 'bg-indigo-100 text-indigo-800',
        dark: 'bg-indigo-900/30 text-indigo-300',
        fill: 'bg-indigo-500'
      },
      purple: {
        light: 'bg-purple-100 text-purple-800',
        dark: 'bg-purple-900/30 text-purple-300',
        fill: 'bg-purple-500'
      },
      green: {
        light: 'bg-green-100 text-green-800',
        dark: 'bg-green-900/30 text-green-300',
        fill: 'bg-green-500'
      }
    };
    
    return {
      icon: isDark ? baseClasses[color as keyof typeof baseClasses].dark : baseClasses[color as keyof typeof baseClasses].light,
      fill: baseClasses[color as keyof typeof baseClasses].fill
    };
  };
  
  const colorClasses = getColorClasses();

  return (
    <div className={`relative overflow-hidden rounded-lg border ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } p-4 shadow-sm transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{title}</h3>
        <div className={`p-2 rounded-full ${colorClasses.icon}`}>
          {React.cloneElement(icon as React.ReactElement, { 
            className: 'h-5 w-5'
          })}
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-2xl font-bold">{status}/{total}</span>
          <span className={`text-sm font-medium ${
            percentage >= 90 
              ? 'text-green-500' 
              : percentage >= 70 
                ? 'text-amber-500' 
                : 'text-red-500'
          }`}>
            {percentage}%
          </span>
        </div>
        <div className={`w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
          <div 
            className={`h-full ${colorClasses.fill} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {status === total 
          ? 'All systems compliant' 
          : `${total - status} systems need attention`}
      </p>
    </div>
  );
};