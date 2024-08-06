import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div className='w-full h-full bg-header bg-cover flex flex-col gap-4 justify-center items-center text-center'>
      <div className='w-1/2 h-1/2 flex flex-col gap-8 justify-center items-center text-primary'>
        <section className='flex flex-col gap-4'>
          <p className='text-9xl'>404</p>
          <p className='text-3xl'>Cette page n'existe pas</p>
        </section>
        <hr className='border-primary w-1/2'></hr>
        <Link to='/' className={buttonVariants({ variant: 'outline' })}>
          Revenir à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default Error404;
