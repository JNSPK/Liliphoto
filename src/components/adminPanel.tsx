import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from './card';
import HeaderAdmin from './headerAdminPanel';
import { Button } from './ui/button';
import { Input } from './ui/input';

export interface Image {
  name: string;
  key?: string; // Pour d'autres propriétés éventuelles
  id?: string;
  url?: string;
}
function AdminPanel() {
  const supabase = useSupabaseClient();
  const user = useUser();

  const CDNURL =
    'https://hixgbxpbcixulgnjopzf.supabase.co/storage/v1/object/public/images/';
  // CDNURL + user.id + "/" + image.name

  const [images, setImages] = useState<Image[]>([]);

  const getImages = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase.storage
      .from('images')
      .list(user.id + '/', {
        limit: 100,
        offset: 0,
        sortBy: {
          column: 'updated_at',
          order: 'desc',
        },
      });

    if (error) {
      alert('Erreur lors du chargement des images');
      console.log(error);
    } else if (data) {
      setImages(data as Image[]);
    }
  }, [supabase, user]);

  useEffect(() => {
    if (user) {
      getImages();
    }
  }, [user, getImages]);

  async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const uploadPromises = Array.from(files).map((file) => {
      const filePath = user?.id + '/' + uuidv4();
      return supabase.storage
        .from('images')
        .upload(filePath, file)
        .then(({ error }) => {
          if (error) {
            console.log(error);
          }
        });
    });

    await Promise.all(uploadPromises);
    getImages();
  }

  async function deleteImage(imageName: string): Promise<void> {
    const { error } = await supabase.storage
      .from('images')
      .remove([user?.id + '/' + imageName]);

    if (error) {
      alert(error);
    } else {
      getImages();
    }
  }
  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
  }

  return (
    <>
      <HeaderAdmin className='flex justify-between px-8 min-h-[5rem]'>
        <h1 className='font-bold text-primary-foreground '>
          Interface d'administration
        </h1>
        <Button
          variant='link'
          className='text-accent hover:border-transparent'
          onClick={signOut}>
          Déconnexion
        </Button>
      </HeaderAdmin>
      <div className='w-[80%] text-primary-foreground h-full flex flex-col gap-4 py-4'>
        <p>Selectionne une ou plusieurs photos</p>
        <Input
          className='bg-white/20 backdrop-blur-sm border-none shadow-lg'
          type='file'
          accept='image/png, image/jpeg, image/jpg, image/raw'
          multiple
          onChange={(e) => uploadImages(e)}></Input>
        <div className='grid gap-8 md:gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center'>
          {images.map((image) => {
            const imageUrl = `${CDNURL}${user?.id}/${image['name']}`;
            return (
              <Card
                onClick={() => deleteImage(image.name)}
                key={imageUrl}
                src={imageUrl}></Card>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
