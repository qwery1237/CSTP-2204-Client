import BgBlackOpacity from '../BgBlackOpacity';

export default function Modal({ children }) {
  return (
    <BgBlackOpacity>
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 min-w-56 text-center overflow-x-auto max-h-96 min-h-48 border-[1.5px] border-lightMode-sbg bg-[#0E1726] dark:bg-[#0E1726] rounded-xl p-5 z-10 flex flex-col max-[520px]:w-full max-[520px]:rounded-none`}
      >
        {children}
      </div>
    </BgBlackOpacity>
  );
}
