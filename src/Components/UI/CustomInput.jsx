import React from 'react';
import { PiWarningCircleBold } from 'react-icons/pi';
export default function CustomInput({
  label,
  paddingLeft,
  placeHolder,
  handleChange,
  children,
  isPassword,
  isInvalid,
  errorMessage,
  autoFocus,
}) {
  const isErrorInput = isInvalid || errorMessage;
  const inputCSS = `w-full th rounded-lg h-[40px] border-[1px] focus-visible:outline-none bg-lightMode-tbg dark:bg-darkMode-tbg border-lightMode-border dark:border-darkMode-border caret-lightMode-p dark:caret-darkMode-p placeholder:text-lightMode-p dark:placeholder:text-darkMode-p text-white min-w-28 ${
    isErrorInput
      ? ' border-darkMode-error focus-visible:border-darkMode-error focus-visible:shadow-[0_0px_6px_#ff5f52]'
      : 'focus-visible:border-lightMode-button focus-visible:shadow-[0_0px_6px_#38bdf8]'
  }`;
  return (
    <div className='relative w-full'>
      <div className='flex flex-col gap-2'>
        {label && (
          <label className='th' htmlFor={label}>
            {label}
          </label>
        )}
        <input
          className={inputCSS}
          type={`${isPassword ? 'password' : 'text'}`}
          id={label}
          placeholder={placeHolder}
          onChange={handleChange}
          style={{ paddingLeft }}
          autoFocus={autoFocus}
        />
      </div>
      {children}
      {isErrorInput && (
        <div className='w-full flex items-center text-start text-xs text-darkMode-error absolute left-2.5 bottom-[-20px] gap-1'>
          {<PiWarningCircleBold />}
          {errorMessage ? errorMessage : ''}
        </div>
      )}
    </div>
  );
}
