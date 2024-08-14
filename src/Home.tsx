import { useState } from 'react';
import Gallery from './components/gallery';

function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className='my-20 w-full h-[calc(100%-var(--header-height))] flex flex-col gap-8 items-center text-center'>
        <Gallery loading={isLoading} setLoading={setIsLoading} />
      </div>
    </>
  );
}

export default Home;
