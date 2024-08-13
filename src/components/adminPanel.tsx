/* eslint-disable react-hooks/exhaustive-deps */
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from './card';
import HeaderAdmin from './headerAdminPanel';
import { Button } from './ui/button';
import { Input } from './ui/input';

export interface Image {
  name: string;
  folder: string;
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
  const [selectedFolder, setSelectedFolder] = useState('');

  const subfolders = ['Musique', 'Portraits', 'Paysages'];

  const getImages = useCallback(async () => {
    const allImages: Image[] = [];

    if (!user) return;

    for (const folder of subfolders) {
      const { data, error } = await supabase.storage
        .from('images')
        .list(`${user.id}/${folder}/`, {
          limit: 100,
          offset: 0,
          sortBy: {
            column: 'updated_at',
            order: 'desc',
          },
        });

      if (error) {
        alert(`Erreur lors du chargement des images du dossier ${folder}`);
        console.log(error);
      } else if (data) {
        const folderImages = data
          .filter((image) => image.name !== '.emptyFolderPlaceholder')
          .map((image) => ({
            ...image,
            folder,
            url: `${CDNURL}${user.id}/${folder}/${image.name}`,
          }));
        allImages.push(...folderImages);
      }
    }
    setImages(allImages);
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
      const filePath = `${user?.id}/${selectedFolder}/${uuidv4()}`;
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

  async function deleteImage(imageName: string, folder: string): Promise<void> {
    const { error } = await supabase.storage
      .from('images')
      .remove([`${user?.id}/${folder}/${imageName}`]);

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
        <div>
          <label
            htmlFor='folder-select'
            className='block text-sm font-medium text-gray-700'>
            Choisir un dossier
          </label>
          <select
            id='folder-select'
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className='lock w-full p-4 mt-1 mb-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
            {subfolders.map((folder) => (
              <option key={folder} value={folder} className='font-quicksand'>
                {folder}
              </option>
            ))}
          </select>

          {/* Input de fichier
          <input type='file' multiple onChange={uploadImages} /> */}
        </div>
        <p>Selectionne une ou plusieurs photos</p>
        <Input
          className='bg-white/20 backdrop-blur-sm border-none shadow-lg'
          type='file'
          accept='image/png, image/jpeg, image/jpg, image/raw'
          multiple
          onChange={(e) => uploadImages(e)}></Input>
        <div className='grid gap-8 md:gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center'>
          {images.map((image) => {
            console.log(images);
            return (
              <Card
                onClick={() => deleteImage(image.name, image.folder)}
                key={image.url}
                src={image.url}></Card>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
