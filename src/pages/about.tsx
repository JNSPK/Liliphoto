import pp from '/src/assets/img/pp.jpg';

function About() {
  return (
    <>
      <div className='flex justify-center items-center h-[calc(100svh-3rem)]'>
        <div className='relative flex flex-col md:flex-row gap-4 items-center h-[90svh] w-[90svw] md:h-[75svh] md:w-[80svw]  rounded p-8 shadow-sm shadow-violet-500 backdrop-blur-[2px]'>
          <figcaption
            className='shadow-md shadow-violet-950 md:w-1/3
         w-full md:min-w-1/3 md:min-h-full  flex h-full overflow-hidden z-50 rounded'>
            <img
              className='align-top w-full object-cover object-center'
              src={pp}
              alt='Moi !'></img>
          </figcaption>
          <p className='w-full md:w-2/3 md:min-w-2/3 h-full text-start z-850'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quos
            error deserunt ipsam eos voluptates ducimus eum. Repellendus rerum,
            voluptas id, corrupti quis fugit dolore enim commodi, mollitia
            repellat rem.
          </p>
          <div className='absolute bottom-0 left-0 inset-0 h-[90svh] w-[90svw] md:h-[75svh] md:w-[80svw] bg-header bg-cover -z-10 blur-[2px] opacity-50 brightness-[115%]'></div>
        </div>
      </div>
    </>
  );
}

export default About;
