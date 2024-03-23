import { useAuth } from '../../context/AuthContext';

export default function SidebarActiveBtn({ setIsProfilePopUpHandler }) {
  const { user } = useAuth();
  return (
    <div
      style={{
        backgroundImage: `url(${user?.frame})`,
        backgroundSize: 'cover', // Adjust as needed

        backgroundPosition: 'center', // Adjust as needed
        // Additional background properties can be added here
      }}
      className=' flex justify-center items-center size-[40px] rounded-full border-0 min-[1001px]:hidden max-[520px]:hidden'
    >
      <img
        onClick={setIsProfilePopUpHandler}
        className='size-9 rounded-full  cursor-pointer object-cover relative'
        src={user?.profileImg}
        alt=''
      />
    </div>
  );
}
