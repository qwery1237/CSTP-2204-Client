import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa6';
import CustomInput from '../UI/CustomInput';
import CustomButton from '../UI/CustomButton';

const SURVEY = [
  'Is there a car wash facility available at this gas station?',
  'Does this gas station offer an air pump service for tires?',
  'Is there a convenience store located at this gas station?',
  'Does this gas station provide electric vehicle (EV) charging stations?',
  'Are there facilities available for truck drivers, such as parking and amenities, at this gas station?',
  'Is there an ATM Machine available at this gas station?',
  'Would you consider using this gas station again?',
];

export default function ModalContent({ title, setModal, gasInfo }) {
  const [newPrice, setNewPrice] = useState([...gasInfo]);
  const [crrIndex, setCrrIndex] = useState(0);
  const [survey, setSurvey] = useState([]);
  const handleClose = () => {
    setModal({});
  };
  const handleChangePrice = (e) => {
    //ToDo Validate user input

    setNewPrice(
      newPrice.map((gas) =>
        gas.type == e.target.id ? { ...gas, price: e.target.value } : gas
      )
    );
  };
  const handleNext = (e) => {
    e.preventDefault();
    setSurvey([...survey, e.target.innerText.toLowerCase()]);
    console.log(survey);
    if (!SURVEY[crrIndex + 1]) {
      //ToDo post the result to database
      setCrrIndex(0);
      setModal({ show: false });
      return;
    }
    setCrrIndex(crrIndex + 1);
  };
  const handleSubmit = (e) => {
    //ToDo post the request to database
    e.preventDefault();
    if (newPrice.some((gas) => isNaN(gas.price))) return;
    setModal({ show: false });
  };
  return (
    <>
      <div className='flex justify-end w-full text-darkMode-border min-w-36 mb-4 mt-2 th '>
        <button onClick={handleClose}>
          <MdClose className='text-xl' />
        </button>
      </div>
      {title === 'price' ? (
        <form className='grid grid-cols-2 justify-center items-center mt-4 gap-y-12 gap-x-8'>
          {gasInfo.map((gas, index) => {
            const { type, price } = gas;
            return (
              <CustomInput
                key={type + price}
                label={type}
                paddingLeft='24px'
                placeHolder={price}
                handleChange={handleChangePrice}
                errorMessage={
                  isNaN(newPrice[index].price) ? 'Invalid Input' : ''
                }
              >
                <FaDollarSign className='absolute left-2 tp text-sm bottom-[13.5px]' />
              </CustomInput>
            );
          })}

          <div className='w-[341px]'>
            <CustomButton handleClick={handleSubmit} />
          </div>
        </form>
      ) : (
        <form className='flex flex-col items-center gap-y-8'>
          <img className='rounded-lg w-56 h-32' src='/oilrig.jpg' alt='' />
          <div className='th text-sm'>
            <span className='mr-4'>Q{crrIndex + 1}.</span>
            <span className=''>{SURVEY[crrIndex]}</span>
          </div>
          <div className='th flex w-full justify-center gap-x-4'>
            <button
              onClick={handleNext}
              className='capitalize bg-darkMode-button w-12 py-2 rounded-lg hover:brightness-125'
            >
              yes
            </button>
            <button
              onClick={handleNext}
              className='capitalize bg-darkMode-error w-12 py-2 rounded-lg hover:brightness-125'
            >
              no
            </button>
          </div>
        </form>
      )}
    </>
  );
}
