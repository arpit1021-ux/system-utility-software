import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../../context/ThemeContext';
import { AuthError, User } from '@supabase/supabase-js';

export const DownloadConfigButton = () => {
  const {isDark} = useTheme()
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError | null>(null);

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

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const config = `SUPABASE_URL=${supabaseUrl}
API_KEY=${supabaseKey}
OWNER_ID=${user.id}
CHECK_INTERVAL_MINUTES=30
`;

    const blob = new Blob([config], {
      type: 'text/plain',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '.env';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      title="Download agent config"
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
