import { Button } from './ui/button';

interface CardProps {
  src: string;
  onClick: () => Promise<void>;
}

function Card(props: CardProps) {
  return (
    <div className='border-solid border-2 border-primary h-80 overflow-hidden flex flex-col justify-between items-center'>
      <div className='h-3/4 w-full'>
        <img
          className='border-b-[1px] border-solid border-primary object-cover object-left-top h-full w-full'
          key={props.src}
          src={props.src}></img>
      </div>
      <div className='w-full h-1/4 flex justify-center items-center'>
        <Button onClick={props.onClick} variant={'destructive'}>
          Supprimer
        </Button>
      </div>
    </div>
  );
}

// https://hixgbxpbcixulgnjopzf.supabase.co/storage/v1/object/public/images/6fe75e5e-90dd-49d9-af4f-b73fb3dbd744/967512dc-46a8-4023-8a96-70f709990660

export default Card;
