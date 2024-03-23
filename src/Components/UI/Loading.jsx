export default function Loading(bgColor) {
  const bgCSS = bgColor || 'bg-[rgba(0,0,0,0.5)]';
  return (
    <div className='w-full h-full  relative'>
      <div className={`${bgColor} absolute top-0 w-full h-full`}></div>
      <div className='w-full h-full absolute top-0'>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='loadingScreen'>
            <div className='loadingScreenline'></div>
            <div className='loadingScreenline'></div>
            <div className='loadingScreenline'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
