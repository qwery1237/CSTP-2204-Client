import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';

export default function PasswordHideBtn({ showPassword, setShowPassword }) {
  return (
    <button
      type='button'
      onMouseDown={() => setShowPassword(true)}
      onMouseUp={() => setShowPassword(false)}
      onMouseLeave={() => setShowPassword(false)}
      className={`absolute right-2 ${
        showPassword ? 'th' : 'tp'
      } text-xl bottom-[10px]`}
    >
      {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
    </button>
  );
}
