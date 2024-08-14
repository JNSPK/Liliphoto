/* eslint-disable react-hooks/exhaustive-deps */
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from './card';
import HeaderAdmin from './headerAdminPanel';
import FullScreenLoader from './loader';
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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [loadedImages, setLoadedImages] = useState(0);

  const CDNURL =
    'https://hixgbxpbcixulgnjopzf.supabase.co/storage/v1/object/public/images/';
  // CDNURL + user.id + "/" + image.name

  const [images, setImages] = useState<Image[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('');

  const subfolders = ['Musique', 'Portraits', 'Paysages'];

  // GET IMAGES //

  const getImages = useCallback(async () => {
    setIsLoading(true);
    const allImages: Image[] = [];

    if (!user) return;

    for (const folder of subfolders) {
      const { data, error } = await supabase.storage
        .from('images')
        .list(`photos/${folder}/`, {
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
            url: `${CDNURL}photos/${folder}/${image.name}`,
          }));
        allImages.push(...folderImages);
      }
    }
    setImages(allImages);
    setLoadedImages(0);
    setIsLoading(false);
  }, [supabase, user]);

  useEffect(() => {
    if (user) {
      getImages();
    }
  }, [user, getImages]);

  // UPLOAD IMAGES //

  async function uploadImages() {
    if (!selectedFiles || !selectedFolder) return;

    setIsLoading(true);

    const uploadPromises = Array.from(selectedFiles).map((file) => {
      const filePath = `photos/${selectedFolder}/${uuidv4()}`;
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
    setSelectedFiles(null);
    getImages();
    setIsLoading(false);
  }

  // DELETE IMAGES //

  async function deleteImage(imageName: string, folder: string): Promise<void> {
    setIsLoading(true);
    const { error } = await supabase.storage
      .from('images')
      .remove([`photos/${folder}/${imageName}`]);

    if (error) {
      alert(error);
      setIsLoading(false);
    } else {
      getImages();
      setIsLoading(false);
    }
  }

  // SIGNOUT //

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
  }

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1); // Incrémenter le compteur des images chargées
  };

  useEffect(() => {
    if (images.length > 0 && loadedImages === images.length) {
      // Désactive le loader lorsque toutes les images sont chargées
      setIsLoading(false);
    }
  }, [loadedImages, images.length]);

  return (
    <>
      {/* {isLoading && (
        <FullScreenLoader className='absolute inset-0 bg-black bg-opacity-50 h-full w-full items-center justify-center' />
      )} */}
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
        <div className='flex flex-col '>
          <div className='flex gap-4'>
            <div className='w-1/3 flex flex-col gap-4'>
              <label htmlFor='folder-select'>Choisir un dossier</label>
              <select
                id='folder-select'
                defaultValue=''
                required
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className='lock w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                {subfolders.map((folder) => (
                  <option
                    key={folder}
                    value={folder}
                    className='font-quicksand'>
                    {folder}
                  </option>
                ))}
              </select>
            </div>
            <div className='w-2/3 flex flex-col gap-4'>
              <label>Selectionne une ou plusieurs photos</label>
              <Input
                className='bg-white/20 backdrop-blur-sm border-none shadow-lg'
                type='file'
                accept='image/png, image/jpeg, image/jpg, image/raw'
                multiple
                onChange={(e) => setSelectedFiles(e.target.files)}></Input>
            </div>
          </div>
          <Button
            variant='ghost'
            onClick={uploadImages} // L'upload se déclenche au clic sur ce bouton
            className='mt-4'
            disabled={!selectedFiles || !selectedFolder} // Désactive le bouton si aucun fichier ou dossier n'est sélectionné
          >
            Upload
          </Button>
        </div>
        <div className='grid gap-8 md:gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center'>
          {isLoading && (
            <FullScreenLoader className='absolute inset-0 w-full h-full bg-black bg-opacity-50 items-center' />
          )}
          {images.map((image) => {
            return (
              <Card
                onClick={() => deleteImage(image.name, image.folder)}
                key={image.url}
                src={image.url}
                onLoad={handleImageLoad}></Card>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
