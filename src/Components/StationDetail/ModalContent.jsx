import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";
import CustomInput from "../UI/CustomInput";
import CustomButton from "../UI/CustomButton";
import { getCrrLocation } from "../../api/gasStation";
import { updatePrice } from "../../api/user";

export default function ModalContent({ setShowModal, station, token,setTimestamp, setStation,updateUserData }) {
  const [error, setError] = useState("");
  const [spoof, setSpoof] = useState(false);
  const [isSpoof, setIsSpoof] = useState(false);
  const [newPrice, setNewPrice] = useState([
    {
      type: "Regular",
      price: null,
    },
    {
      type: "Mid-grade",
      price: null,
    },
    {
      type: "Premium",
      price: null,
    },
    {
      type: "Diesel",
      price: null,
    },
  ]);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleChangePrice = (e) => {
    setNewPrice(
      newPrice.map((gas) =>
        gas.type === e.target.id ? { ...gas, price: e.target.value } : gas
      )
    );
  };
  const getPriceForType = (fuelType) => {
    const fuel = newPrice.find((item) => item.type === fuelType);
    return fuel ? fuel.price : 0;
  };
  useEffect(() => {
    if (
      error === "Distance between you and station must be 200 meters or less"
    ) {
      setSpoof(true);
    } else {
      setSpoof(false);
    }
  }, [error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let location;

    if (isSpoof) {
      location = {
        lat: station.latlng.latitude,
        lng: station.latlng.longitude,
      };
    } else {
      location = await getCrrLocation();
    }
    let diesel = parseFloat(getPriceForType("Diesel"));
    let regular = parseFloat(getPriceForType("Regular"));
    let midGrade = parseFloat(getPriceForType("Mid-grade"));
    let premium = parseFloat(getPriceForType("Premium"));

    const result = await updatePrice(
      token,
      station.placeId,
      location.lat,
      location.lng,
      diesel,
      midGrade,
      premium,
      regular
    );
    if (result.success) {
      setTimestamp(result.data.currentTimestamp)
      setStation((prevState) => ({ ...prevState , priceHistory: result.data.priceHistory, price: result.data.price}));
      updateUserData()
      setShowModal(false)

    } else {
      setError(result.message);
    }
  };
  return (
    <>
      <div className=" flex flex-row w-screen h-screen justify-center items-center">
        <div className="w-[400px] sbg p-4 rounded-xl max-[520px]:h-screen max-[520px]:w-screen max-[520px]:rounded-none max-[520px]:flex max-[520px]:flex-col">
          <div className="flex justify-end w-full text-darkMode-border min-w-36 mb-4 mt-2 th ">
            <button onClick={handleClose}>
              <MdClose className="text-xl" />
            </button>
          </div>
        
          <form className="grid grid-cols-2 justify-center items-center mt-4 gap-y-12 gap-x-8 max-[520px]:grid-cols-1 max-[520px]:gap-y-4">
            {newPrice.map((gas, index) => {
              const { type } = gas;
              return (
                <CustomInput
                  key={type}
                  label={type}
                  paddingLeft="24px"
                  placeHolder={type}
                  handleChange={handleChangePrice}
                  value={gas.price}
                  isPix={true}
                  errorMessage={
                    isNaN(newPrice[index].price) ? "Invalid Input" : ""
                  }
                >
                  <FaDollarSign className="absolute left-2 tp text-sm bottom-[13.5px]" />
                </CustomInput>
              );
            })}
          </form>
          {error && (
            <div className="text-xs text-center text-lightMode-error dark:text-darkMode-error relative top-[16px]">
              {error}{" "}
            </div>
          )}
          {spoof && (
            <div
              onClick={() => setIsSpoof(true)}
              className="text-xs text-center tb relative top-[16px] cursor-pointer hover:underline"
            >
              Spoof location (dev)
            </div>
          )}

          <div className="max-[520px]:flex-1"></div>
          <div className="w-full mt-12 ">
            <CustomButton handleClick={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}
