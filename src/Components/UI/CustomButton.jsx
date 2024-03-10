import React from 'react';

export default function CustomButton({
  bgColor,
  width,
  height,
  fontSize,
  children,
  handleClick,
  rounded,
  hoverDarker,
  disable,
}) {
  const fontSizeCSS = 'text-' + (fontSize || 'sm');
  const roundedCSS = 'rounded-' + (rounded || 'lg');
  const hoverCSS = disable
    ? ''
    : hoverDarker
    ? 'hover:brightness-90'
    : 'hover:brightness-125';

  return (
    <button
      className={`px-2 h-10 ${fontSizeCSS}  th ${hoverCSS} ${roundedCSS}`}
      style={{
        backgroundColor: bgColor ? bgColor : '#0BA5E9',
        width: width ? width : '100%',
        height: height ? height : '2.5ren',
      }}
      onClick={handleClick}
      disabled={disable}
    >
      {children || 'Submit'}
    </button>
  );
}
{
  /* <button
  onClick={handleButtonClick}
  className=' px-2 w-full h-10 bg-lightMode-button dark:bg-lightMode-button text-lightMode-header font-[400] text-sm dark:text-lightMode-header hover:bg-lightMode-buttonHover rounded-lg'
>
  {data}
</button>; */
}
