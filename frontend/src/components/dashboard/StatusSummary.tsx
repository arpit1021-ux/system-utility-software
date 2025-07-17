import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface StatusSummaryProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  color: string;
}

export const StatusSummary: React.FC<StatusSummaryProps> = ({
  title,
  value,
  icon,
  trend,
  trendUp,
  color
}) => {
  const { isDark } = useTheme();
  
  const getColors = () => {
    const colors = {
      blue: {
        bgLight: 'bg-blue-50',
        bgDark: 'bg-blue-900/20',
        iconLight: 'text-blue-600',
        iconDark: 'text-blue-400',
        border: 'border-blue-100 dark:border-blue-800'
      },
      red: {
        bgLight: 'bg-red-50',
        bgDark: 'bg-red-900/20',
        iconLight: 'text-red-600',
        iconDark: 'text-red-400',
        border: 'border-red-100 dark:border-red-800'
      },
      amber: {
        bgLight: 'bg-amber-50',
        bgDark: 'bg-amber-900/20',
        iconLight: 'text-amber-600',
        iconDark: 'text-amber-400',
        border: 'border-amber-100 dark:border-amber-800'
      },
      green: {
        bgLight: 'bg-green-50',
        bgDark: 'bg-green-900/20',
        iconLight: 'text-green-600',
        iconDark: 'text-green-400',
        border: 'border-green-100 dark:border-green-800'
      }
    };
    
    return colors[color as keyof typeof colors];
  };
  
  const colorSet = getColors();
  
  return (
    <div className={`relative overflow-hidden rounded-lg border ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } p-4 shadow-sm transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-md p-3 ${
          isDark ? colorSet.bgDark : colorSet.bgLight
        } ${colorSet.border}`}>
          {React.cloneElement(icon as React.ReactElement, { 
            className: `h-5 w-5 ${isDark ? colorSet.iconDark : colorSet.iconLight}`
          })}
        </div>
        <div className="ml-4 flex-1">
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            <p className={`ml-2 flex items-center text-sm font-medium ${
              trendUp 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-green-600 dark:text-green-400'
            }`}>
              {trendUp ? (
                <ArrowUp className="mr-0.5 h-4 w-4" />
              ) : (
                <ArrowDown className="mr-0.5 h-4 w-4" />
              )}
              {trend}
            </p>
          </div>
        </div>
      </div>
      <div 
        className={`absolute bottom-0 left-0 h-1 w-full ${
          isDark ? colorSet.iconDark : colorSet.iconLight
        }`}
      ></div>
    </div>
  );
};