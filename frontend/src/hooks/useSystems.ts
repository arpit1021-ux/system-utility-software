import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import { useAuth } from '../context/AuthContext';

export type SystemRow = Database['public']['Tables']['systems']['Row'];

export function useSystems() {
  const [systems, setSystems] = useState<SystemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchSystems() {
      try {
        setLoading(true);
        setError(null);

        if (!user) {
          setSystems([]);
          return;
        }

        const { data, error } = await supabase
          .from('systems')
          .select('*')
        //   .eq('owner_id', user.id);

        if (error) {
          throw error;
        }

        setSystems(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching systems');
      } finally {
        setLoading(false);
      }
    }

    fetchSystems();
  }, [user]);

  return { systems, loading, error };
}