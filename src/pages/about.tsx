import pp from '/src/assets/img/pp.jpg';

function About() {
  return (
    <div className='flex justify-center items-center h-[calc(100%-3rem)]'>
      <div className=' flex gap-4 items-center h-[75svh] w-[80svw]  rounded p-4 shadow-lg backdrop-blur-sm'>
        <div className='absolute inset-0 bg-white opacity-10 z-10 rounded'></div>
        <figcaption
          className='shadow-sm w-1/3
         min-w-1/3 min-h-full  flex h-full overflow-hidden z-50'>
          <img
            className='align-top w-full object-cover object-center'
            src={pp}
            alt='Moi !'></img>
        </figcaption>
        <p className='w-2/3 min-w-2/3 h-full text-start z-850'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quos
          error deserunt ipsam eos voluptates ducimus eum. Repellendus rerum,
          voluptas id, corrupti quis fugit dolore enim commodi, mollitia
          repellat rem.
        </p>
      </div>

      <div className=' fixed h-full inset-0 bg-header bg-cover opacity-100 -z-10'></div>
    </div>
  );
}

export default About;
