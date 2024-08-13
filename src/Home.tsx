import Gallery from './components/gallery';

function Home() {
  return (
    <div className='my-20 w-full h-[calc(100%-var(--header-height))] flex flex-col gap-8 items-center text-center'>
      <Gallery />
    </div>
  );
}

export default Home;
