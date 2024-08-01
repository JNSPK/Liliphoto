import AdminPanel from '@/components/adminPanel';
import Login from '@/components/login';
import { useUser } from '@supabase/auth-helpers-react';

function Admin() {
  const user = useUser();
  console.log(user);

  return (
    <div className='w-full h-full bg-background flex flex-col gap-4 justify-center items-center text-center'>
      <div className='w-1/2 flex gap-4 justify-center'></div>
      {user === null ? <Login /> : <AdminPanel />}
    </div>
  );
}

export default Admin;
