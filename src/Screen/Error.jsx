import { Link, useRouteError } from 'react-router-dom';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import Background from '../Components/Landing/Background';

export default function Error() {
  const error = useRouteError();
  console.log(error.message);
  const { statusText, data } = useRouteError();
  return (
    <div className='w-screen h-screen bg-lightMode-bg dark:bg-darkMode-bg flex justify-center items-center'>
      <Background />
      <div className='z-10 flex flex-col items-center gap-y-4'>
        <div className=' text-darkMode-error text-6xl font-bold '>
          {statusText || 'Something Went Wrong'}
        </div>
        <div className='text-darkMode-error font-bold text-lg'>
          {data || 'Error: ' + error.message}
        </div>
        <Link
          to={'/'}
          className=' text-darkMode-button text-xl flex items-center gap-x-2'
        >
          <FaRegArrowAltCircleRight />
          Go Back to Landing page
        </Link>
      </div>
    </div>
  );
}
