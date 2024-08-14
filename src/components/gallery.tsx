/* eslint-disable react-hooks/exhaustive-deps */
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCallback, useEffect, useState } from 'react';
import { Image } from './adminPanel';
import FullScreenLoader from './loader';

interface GalleryProps {
  loading?: boolean;
  setLoading: (isLoading: boolean) => void;
}

function Gallery({ loading, setLoading }: GalleryProps) {
  const supabase = useSupabaseClient();

  const [images, setImages] = useState<Image[]>([]);
  const [loadedImages, setLoadedImages] = useState(0);

  const subfolders = ['Musique', 'Portraits', 'Paysages'];

  const getImages = useCallback(async () => {
    setLoading(true);
    const allImages: Image[] = [];
    for (const folder of subfolders) {
      const { data, error } = await supabase.storage
        .from('images')
        .list(`photos/${folder}`, {
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
        const imageUrls = await Promise.all(
          data
            .filter((image) => image.name !== '.emptyFolderPlaceholder')
            .map(async (image) => {
              const { data: publicUrlData } = supabase.storage
                .from('images')
                .getPublicUrl('photos/' + folder + '/' + image.name);
              return {
                name: image.name,
                folder: folder,
                url: publicUrlData.publicUrl,
              };
            })
        );
        allImages.push(...imageUrls);
      }
    }
    setImages(allImages);
  }, [supabase, setLoading]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {
      keyboard: {
        Escape: 'close',
        Delete: 'close',
        Backspace: 'close',
        PageUp: 'next',
        PageDown: 'prev',
        ArrowUp: 'prev',
        ArrowDown: 'next',
        ArrowRight: 'next',
        ArrowLeft: 'prev',
      },
    });
  }, [images]);

  useEffect(() => {
    if (images.length > 0 && loadedImages === images.length) {
      // Désactive le loader lorsque toutes les images sont chargées
      setLoading(false);
    }
  }, [loadedImages, images.length, setLoading]);

  Fancybox.defaults.Hash = false;

  return (
    <>
      <section className='relative columns-1 md:columns-2 w-4/5 gap-1 max-w-[1100px]'>
        {loading && (
          <FullScreenLoader className='absolute inset-0 w-full h-full bg-background bg-opacity-100' />
        )}
        {images.map((image) => (
          <div key={image.name} className='mb-1 break-inside-avoid'>
            <a href={image.url} data-fancybox='gallery'>
              <img
                src={image.url}
                alt={image.name}
                loading='lazy'
                onLoad={() => setLoadedImages((prev) => prev + 1)}
                className='w-full h-full object-cover'
              />
            </a>
          </div>
        ))}
      </section>
    </>
  );
}

export default Gallery;
