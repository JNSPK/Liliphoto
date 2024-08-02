import AdminPanel from '@/components/adminPanel';
import Login from '@/components/login';
import {
  useSessionContext,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const { session, isLoading: isSessionLoading } = useSessionContext();
  const user = useUser();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  useEffect(() => {
    // Extract the token from the URL hash
    const { access_token, refresh_token } = getHashParams();

    if (access_token && refresh_token) {
      // Complete the authentication with Supabase
      supabase.auth
        .setSession({
          access_token,
          refresh_token,
        })
        .then(({ data, error }) => {
          if (error) {
            console.error('Error setting session:', error);
          } else {
            console.log('Session set successfully:', data);
            // Clear the hash from the URL
            navigate('/admin', { replace: true });
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    console.log('Session:', session);
    console.log('User:', user);
  }, [session, user]);

  if (isSessionLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='w-full h-full bg-background flex flex-col gap-4 justify-center items-center text-center'>
        <div className='w-1/2 flex gap-4 justify-center'></div>
        {user === null ? <Login /> : <AdminPanel />}
      </div>
    );
  }
}

export default Admin;

type HashParams = {
  access_token?: string;
  refresh_token?: string;
  expires_at?: string;
  expires_in?: string;
  token_type?: string;
  type?: string;
};

function getHashParams(): HashParams {
  const hashIndex = window.location.hash.indexOf('#', 1); // Find the second `#`
  const hash = window.location.hash.substring(hashIndex + 1); // Get the string after the second `#`
  const params: HashParams = {};
  hash.split('&').forEach((param) => {
    const [key, value] = param.split('=');
    if (key) {
      params[key as keyof HashParams] = decodeURIComponent(value);
    }
  });
  return params;
}
