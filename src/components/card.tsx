import { Button } from './ui/button';

interface CardProps {
  src: string | undefined;
  onClick: () => Promise<void>;
  onLoad: () => void;
}

function Card({ src, onClick, onLoad }: CardProps) {
  return (
    <div className='bg-opacity-5 h-80 overflow-hidden shadow-md flex flex-col justify-between items-center rounded-sm'>
      <div className='h-3/4 w-full'>
        <img
          className='shadow-sm object-cover object-left-top h-full w-full'
          key={src}
          src={src}
          loading='lazy'
          onLoad={onLoad}></img>
      </div>
      <div className='backdrop-blur-md w-full h-1/4 flex justify-center items-center'>
        <Button onClick={onClick} variant={'destructive'}>
          Supprimer
        </Button>
      </div>
    </div>
  );
}

export default Card;
