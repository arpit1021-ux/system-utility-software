import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { supabase } from '../../lib/supabase'; // Adjust path based on your project
import { useTheme } from '../../context/ThemeContext';
import { AuthError, User } from '@supabase/supabase-js';

export const DownloadConfigButton = () => {
  const {isDark} = useTheme()
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError | null>(null);

  // Fetch user on mount
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setError(error);
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  const handleDownload = async () => {
    if (error || !user) {
      console.error("Error fetching user:", error);
      alert("User not logged in.");
      return;
    }

    const config = {
      owner_id: user.id,
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'agent-config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className={`p-2 rounded-md ${
        isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
      } border ${
        isDark ? 'border-gray-700' : 'border-gray-300'
      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      <Download className="h-5 w-5" />
    </button>
  );
};
