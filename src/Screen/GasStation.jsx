import { useEffect, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SideBar from '../Components/SideBar/SideBar';
import TopNav from '../Components/TopNav/TopNav';
import ModalContent from '../Components/StationDetail/ModalContent';
import StationInfo from '../Components/StationDetail/StationInfo';
import GasPrice from '../Components/StationDetail/GasPrice';
import Amenities from '../Components/StationDetail/Amenities';
import Contributor from '../Components/StationDetail/Contributor/Contributor';
import CommentSection from '../Components/StationDetail/CommentSection/CommentSection';

import { getGasStationById } from '../api/gasStation';
import { useAuth } from '../context/AuthContext';
import Loading from '../Components/UI/Loading';
import BgBlackOpacity from '../Components/BgBlackOpacity';

export default function GasStation() {
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [showModal, setShowModal] = useState();
  const [placeId, setPlaceId] = useState(null);
  const [station, setStation] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const { user, token, updateUserData } = useAuth();
  const [gasInfo, setGasInfo] = useState([
    {
      type: 'Regular',
      price: ' - -',
      updatedBy: '- -',
      updatedAt: 'Not updated',
    },
    {
      type: 'Mid-grade',
      price: ' - -',
      updatedBy: '- -',
      updatedAt: 'Not updated',
    },
    {
      type: 'Premium',
      price: ' - -',
      updatedBy: '- -',
      updatedAt: 'Not updated',
    },
    {
      type: 'Diesel',
      price: ' - -',
      updatedBy: '- -',
      updatedAt: 'Not updated',
    },
  ]);

  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    setPlaceId(lastPart);
  }, []);

  useEffect(() => {
    if (station && station.price) {
      if (station.price.regular.price && station.price.regular.price > 0) {
        const updatedAgo = getUpdatedAgo(station.price.regular.timeStamp);

        updateGasInfo({
          type: 'Regular',
          price: station.price.regular.price,
          updatedBy: station.price.regular.name,
          updatedAt: updatedAgo,
        });
      }
      if (station.price.midGrade.price && station.price.midGrade.price > 0) {
        const updatedAgo = getUpdatedAgo(station.price.midGrade.timeStamp);

        updateGasInfo({
          type: 'Mid-grade',
          price: station.price.midGrade.price,
          updatedBy: station.price.midGrade.name,
          updatedAt: updatedAgo,
        });
      }
      if (station.price.premium.price && station.price.premium.price > 0) {
        const updatedAgo = getUpdatedAgo(station.price.premium.timeStamp);

        updateGasInfo({
          type: 'Premium',
          price: station.price.premium.price,
          updatedBy: station.price.premium.name,
          updatedAt: updatedAgo,
        });
      }
      if (station.price.diesel.price && station.price.diesel.price > 0) {
        const updatedAgo = getUpdatedAgo(station.price.diesel.timeStamp);

        updateGasInfo({
          type: 'Diesel',
          price: station.price.diesel.price,
          updatedBy: station.price.diesel.name,
          updatedAt: updatedAgo,
        });
      }
    }
  }, [station, timestamp]);
  const updateGasInfo = (updatedGas) => {
    setGasInfo((prevGasInfo) => {
      return prevGasInfo.map((gas) => {
        if (gas.type === updatedGas.type) {
          return updatedGas;
        }
        return gas;
      });
    });
  };

  function getUpdatedAgo(time) {
    const timeDifferenceInSeconds = Math.floor((timestamp - time) / 1000);
    let timeDifference = '';
    if (isNaN(timeDifferenceInSeconds)) {
      timeDifference = 'No time data';
    } else if (timeDifferenceInSeconds < 15) {
      timeDifference = 'just now';
    } else if (timeDifferenceInSeconds < 60) {
      timeDifference = `${timeDifferenceInSeconds} sec ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      timeDifference = `${Math.floor(timeDifferenceInSeconds / 60)} min ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      timeDifference = `${Math.floor(timeDifferenceInSeconds / 3600)} hr ago`;
    } else if (timeDifferenceInSeconds < 2592000) {
      timeDifference = `${Math.floor(timeDifferenceInSeconds / 86400)} day ago`;
    } else if (timeDifferenceInSeconds < 31536000) {
      timeDifference = `${Math.floor(
        timeDifferenceInSeconds / 2592000
      )} month ago`;
    } else {
      timeDifference = `${Math.floor(
        timeDifferenceInSeconds / 31536000
      )} year ago`;
    }
    return timeDifference;
  }

  useEffect(() => {
    if (token && placeId) {
      getStationData();
    }
  }, [token, placeId]);
  const getStationData = async () => {
    try {
      const { data, currentTimestamp } = await getGasStationById(
        placeId,
        token
      );

      setStation(data);
      setTimestamp(currentTimestamp);
    } catch (error) {
      console.log(error);
    }
  };

  if (!station) {
    return <Loading bgColor='bg-inherit' />;
  }

  // TODO: get gasInfo from real database
  // add useEffect for all the info
  return (
    <>
      {showModal && (
        <Modal>
          <ModalContent
            station={station}
            token={token}
            setShowModal={setShowModal}
            gasInfo={gasInfo}
            setStation={setStation}
            setTimestamp={setTimestamp}
            updateUserData={updateUserData}
          />
        </Modal>
      )}
      <TopNav setIsProfilePopUp={setIsProfilePopUp}>
        <div
          onClick={() => {
            setShowModal(true);
          }}
          name='price'
          className=' flex flex-row items-center tp w-[100px] justify-center gap-x-1 cursor-pointer hover:text-white'
        >
          <EditOutlinedIcon />
          <div>Price</div>
        </div>
      </TopNav>
      <div className=' flex-1 flex-col overflow-auto mt-3'>
        <StationInfo placeId={placeId} station={station} />
        <GasPrice gasInfo={gasInfo} setShowModal={setShowModal} />
        <Amenities station={station} />
        <Contributor station={station} />

        <CommentSection
          timestamp={timestamp}
          setTimestamp={setTimestamp}
          setStation={setStation}
          token={token}
          user={user}
          station={station}
        />
      </div>

      {isProfilePopUp && (
        <SideBar isProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />
      )}
    </>
  );
}
function Modal({ children }) {
  return <BgBlackOpacity>{children}</BgBlackOpacity>;
}
