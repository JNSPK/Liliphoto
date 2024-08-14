import { useState } from 'react';
import FullScreenLoader from './loader';

interface HeroBannerProps {
  src: string;
}

function HeroBanner(props: HeroBannerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <>
      <FullScreenLoader
        className='absolute items-center inset-0 h-full w-full bg-opacity-100 bg-white'
        isVisible={isLoading}
      />
      <div className='h-[calc(100svh-var(--header-height))]'>
        <img
          className='h-full w-full object-cover md:object-left-top object-center'
          loading='lazy'
          src={props.src}
          onLoad={handleLoad}
          onError={() => setIsLoading(false)}
          alt='Hero Banner'></img>
      </div>
    </>
  );
}

export default HeroBanner;
