import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './header';
import { Button } from './ui/button';
import { Input } from './ui/input';

function AdminPanel() {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [images, setImages] = useState();

  return (
    <>
      <Header className='flex justify-between px-8'>
        <h1 className='font-bold text-primary '>Interface d'administration</h1>
        <Button className='text-accent-foreground ' onClick={signOut}>
          Déconnexion
        </Button>
      </Header>
      <div className='w-full md:w-[80%] text-primary'>
        <p>Selectionne une ou plusieurs photos</p>
        <Input
          type='file'
          accept='image/png, image/jpeg, image/jpg, image/raw'
          onChange={(e) => uploadImage(e)}></Input>
      </div>
    </>
  );

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
  }

  async function getImages() {
    const { data, error } = await supabase.storage
      .from('images')
      .list(user?.id + '/', {
        limit: 100,
        offset: 0,
        sortBy: {
          column: 'name',
          order: 'asc',
        },
      });

    if (data !== null) {
      setImages(data);
    } else {
      alert('Erreur lors du chargement des images');
      console.log(error);
    }
  }

  async function uploadImage(e) {
    const file = e.target.files[0];

    const { data, error } = await supabase.storage
      .from('images')
      .upload(user?.id + '/' + uuidv4(), file);

    if (data) {
      getImages();
    } else {
      console.log(error);
    }
  }
}

export default AdminPanel;
