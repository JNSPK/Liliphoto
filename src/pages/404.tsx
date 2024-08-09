import { buttonVariants } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Nettoyage de l'écouteur pour éviter les fuites de mémoire
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='w-full h-[calc(100svh-3rem)] flex flex-col gap-4 justify-center items-center text-center'>
      <div className='w-1/2 h-1/2 flex flex-col gap-8 justify-center items-center text-primary-foreground'>
        <section className='flex flex-col gap-4'>
          <p className='text-9xl'>404</p>
          <p className='text-3xl'>Cette page n'existe pas</p>
        </section>
        <hr className='border-primary-foreground w-1/2'></hr>
        <Link
          to='/'
          className={buttonVariants({
            variant: isMobile ? 'outline' : 'ghost',
          })}>
          Revenir à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default Error404;
