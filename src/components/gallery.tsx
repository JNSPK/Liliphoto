/* eslint-disable react-hooks/exhaustive-deps */
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCallback, useEffect, useState } from 'react';
import { Image } from './adminPanel';

function Gallery() {
  const supabase = useSupabaseClient();

  const [images, setImages] = useState<Image[]>([]);

  const subfolders = ['Musique', 'Portraits', 'Paysages'];

  const getImages = useCallback(async () => {
    const allImages: Image[] = [];
    for (const folder of subfolders) {
      const { data, error } = await supabase.storage
        .from('images')
        .list(`6fe75e5e-90dd-49d9-af4f-b73fb3dbd744/${folder}`, {
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
        console.log(data);
        const imageUrls = await Promise.all(
          data
            .filter((image) => image.name !== '.emptyFolderPlaceholder')
            .map(async (image) => {
              const { data: publicUrlData } = supabase.storage
                .from('images')
                .getPublicUrl(
                  '6fe75e5e-90dd-49d9-af4f-b73fb3dbd744/' +
                    folder +
                    '/' +
                    image.name
                );
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
  }, [supabase]);

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

  Fancybox.defaults.Hash = false;

  return (
    <section className='columns-1 md:columns-2 w-4/5 gap-1 max-w-[1100px]'>
      {images.map((image) => (
        <div key={image.name} className='mb-1 break-inside-avoid'>
          <a href={image.url} data-fancybox='gallery'>
            <img
              src={image.url}
              alt={image.name}
              loading='lazy'
              className='w-full h-full object-cover'
            />
          </a>
        </div>
      ))}
    </section>
  );
}

export default Gallery;
