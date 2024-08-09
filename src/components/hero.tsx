interface HeroBannerProps {
  src: string;
}

function HeroBanner(props: HeroBannerProps) {
  return (
    <div className='h-[calc(100svh-var(--header-height))]'>
      <img
        className='h-full w-full object-cover md:object-left-top object-center'
        src={props.src}></img>
    </div>
  );
}

export default HeroBanner;
