import { useState } from 'react';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SideBar from '../Components/SideBar/SideBar';
import BgBlackOpacity from '../Components/BgBlackOpacity';
import TopNav from '../Components/TopNav/TopNav';
import ModalContent from '../Components/StationDetail/ModalContent';
import StationInfo from '../Components/StationDetail/StationInfo';
import GasPrice from '../Components/StationDetail/GasPrice';
import Amenities from '../Components/StationDetail/Amenities';
import Contributor from '../Components/StationDetail/Contributor/Contributor';
import CommentSection from '../Components/StationDetail/CommentSection/CommentSection';
import Modal from '../Components/UI/Modal';

export default function GasStation() {
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [modal, setModal] = useState({});
  const [gasInfo, setGasInfo] = useState([
    {
      type: 'Regular',
      price: 1.62,
      updatedBy: 'Harinder',
      updatedAt: new Date().setDate(new Date().getDate() - 3),
    },
    {
      type: 'Mid-grade',
      price: 1.72,
      updatedBy: 'Jinsoo',
      updatedAt: new Date().setHours(new Date().getHours() - 5),
    },
    {
      type: 'Premium',
      price: 1.76,
      updatedBy: 'Prab',
      updatedAt: new Date().setMinutes(new Date().getMinutes() - 7),
    },
    {
      type: 'Diesel',
      price: 1.78,
      updatedBy: 'Laghav',
      updatedAt: Date.now(),
    },
  ]);

  const handleModal = (title) => {
    setModal({ show: true, title });
  };
  // ToDo get gasInfo from real database
  // add useEffect for all the info
  return (
    <>
      {modal.show && (
        <Modal>
          <ModalContent
            title={modal.title}
            setModal={setModal}
            gasInfo={gasInfo}
          />
        </Modal>
      )}
      <TopNav setIsProfilePopUp={setIsProfilePopUp}>
        <div
          onClick={() => handleModal('price')}
          name='price'
          className=' flex flex-row items-center tp w-[100px] justify-center gap-x-1 cursor-pointer hover:text-white max-[740px]:w-10 '
        >
          <EditOutlinedIcon />
          <div className=' max-[740px]:hidden'>Price</div>
        </div>
        <div className='h-full cborder border-l-[1px]'></div>
        <div
          name='survey'
          onClick={() => handleModal('survey')}
          className=' flex flex-row items-center tp w-[100px] justify-center gap-x-1 cursor-pointer hover:text-white max-[740px]:w-10   '
        >
          <PollOutlinedIcon />
          <div className=' max-[740px]:hidden'>Survey</div>
        </div>
      </TopNav>
      <div className=' flex-1 flex-col overflow-auto mt-3'>
        <StationInfo setModal={setModal} />
        <GasPrice gasInfo={gasInfo} setModal={setModal} />
        <Amenities />
        <Contributor />

        <CommentSection />
      </div>

      {isProfilePopUp && (
        <SideBar isProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />
      )}
    </>
  );
}
