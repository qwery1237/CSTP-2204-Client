import BgBlackOpacity from '../BgBlackOpacity';

export default function Modal({ children }) {
  return (
    <BgBlackOpacity>
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-96 text-center overflow-x-hidden max-h-96 h-5/6 border-[1.5px] border-lightMode-sbg bg-[#0E1726] dark:bg-[#0E1726] rounded-xl p-5 z-10`}
      >
        {children}
      </div>
    </BgBlackOpacity>
  );
}
