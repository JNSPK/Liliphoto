import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

function Login() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [succesMessage, setSuccessMessage] = useState('');

  const supabase = useSupabaseClient();

  async function magicLinkLogin() {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: import.meta.env.PROD
          ? import.meta.env.VITE_PROD_URL
          : import.meta.env.VITE_DEV_URL,
      },
    });

    if (error) {
      console.error(error);
      setErrorMessage(
        "Vous n'êtes pas autorisé à accéder à l'interface d'administration"
      );
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      setSuccessMessage('');
    } else {
      setErrorMessage('');
      setSuccessMessage(
        'Consultez votre boîte mail afin de poursuivre la connexion'
      );
    }
  }

  return (
    <div className='flex flex-col gap-4 w-1/2'>
      <label className='self-start text-accent'>Email</label>
      <hr></hr>
      <Input
        className='text-accent'
        placeholder='Entrez votre email'
        onChange={(e) => setEmail(e.target.value)}></Input>
      {errorMessage && <div className='text-destructive'>{errorMessage}</div>}
      {succesMessage && <div className='text-secondary'>{succesMessage}</div>}
      <Button
        variant='outline'
        className='text-accent'
        onClick={magicLinkLogin}>
        Obtenir le Magic Link
      </Button>
    </div>
  );
}

export default Login;
