import { useOutletContext } from 'react-router-dom';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import TopNav from './TopNav';

export default function TopNavHome({ isList, setIsList }) {
  const { setIsProfilePopUp } = useOutletContext();
  return (
    <TopNav showSearchbar setIsProfilePopUp={setIsProfilePopUp}>
      <div
        onClick={() => setIsList(true)}
        className={`flex flex-row items-center ${
          isList
            ? 'text-lightMode-button dark:text-darkMode-button'
            : 'text-lightMode-p dark:text-darkMode-p  hover:text-lightMode-header dark:hover:text-darkMode-header '
        }    w-[100px] justify-center gap-x-1 ${'cursor-pointer'}  max-[740px]:w-10`}
      >
        <FormatListBulletedOutlinedIcon />
        <div className='max-[740px]:hidden'>List</div>
      </div>
      <div className='h-full cborder border-l-[1px]'></div>

      <div
        onClick={() => setIsList(false)}
        className={`flex flex-row items-center ${
          !isList
            ? 'text-lightMode-button dark:text-darkMode-button'
            : 'text-lightMode-p dark:text-darkMode-p  hover:text-lightMode-header dark:hover:text-darkMode-header '
        } w-[100px] justify-center gap-x-1 ${'cursor-pointer'} max-[740px]:w-10`}
      >
        <MapOutlinedIcon />
        <div className='max-[740px]:hidden'>Map</div>
      </div>
      
    </TopNav>
  );
}
