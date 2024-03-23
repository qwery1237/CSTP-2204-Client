import { useEffect, useState } from "react";

const AMENITIYLIST = [
  { name: "Car wash", src: "/carWash.png" },
  { name: "Air pump", src: "/airPump.png" },
  { name: "Convenience store", src: "/conv.webp" },
  { name: "Ev charging station", src: "/ev.webp" },
  { name: "ATM", src: "/atm.png" },
];

export default function Amenities({ station }) {
  const { amenities } = station;
  const [amenitiesList, setAmenitiesList] = useState(null);
  useEffect(() => {
    const amenitiesJsxArray = [];
    if (amenities.carWash.isValid) {
      amenitiesJsxArray.push(
        <li
          key={"Car wash"}
          className=" max-w-[165px] flex flex-col items-center justify-around py-2 sbg th rounded-lg w-[100%] h-36 my-2"
        >
          <img
            className="w-[50px] h-[50px] invert"
            src={"/carWash.png"}
            alt=""
          />
          <div className=" text-sm th w-full text-center pb-2 flex flex-row justify-center">
            {"Car wash"}
          </div>
        </li>
      );
    }
    if (amenities.atm.isValid) {
      amenitiesJsxArray.push(
        <li
          key={"Atm"}
          className=" max-w-[165px] flex flex-col items-center justify-around py-2 sbg th rounded-lg w-[100%] h-36 my-2"
        >
          <img className="w-[50px] h-[50px] invert" src={"/atm.png"} alt="" />
          <div className=" text-sm th w-full text-center pb-2 flex flex-row justify-center">
            {"Atm"}
          </div>
        </li>
      );
    }
    if (amenities.airPump.isValid) {
      amenitiesJsxArray.push(
        <li
          key={"Air Pump"}
          className=" max-w-[165px] flex flex-col items-center justify-around py-2 sbg th rounded-lg w-[100%] h-36 my-2"
        >
          <img
            className="w-[50px] h-[50px] invert"
            src={"/airPump.png"}
            alt=""
          />
          <div className=" text-sm th w-full text-center pb-2 flex flex-row justify-center">
            {"Air Pump"}
          </div>
        </li>
      );
    }
    if (amenities.convenienceStore.isValid) {
      amenitiesJsxArray.push(
        <li
          key={"Convenience store"}
          className=" max-w-[165px] flex flex-col items-center justify-around py-2 sbg th rounded-lg w-[100%] h-36 my-2"
        >
          <img className="w-[50px] h-[50px] invert" src={"/conv.webp"} alt="" />
          <div className=" text-sm th w-full text-center pb-2 flex flex-row justify-center">
            {"Convenience store"}
          </div>
        </li>
      );
    }
    if (amenities.evChargingStation.isValid) {
      amenitiesJsxArray.push(
        <li
          key={"Ev charging station"}
          className=" max-w-[165px] flex flex-col items-center justify-around py-2 sbg th rounded-lg w-[100%] h-36 my-2"
        >
          <img className="w-[50px] h-[50px] invert" src={"/ev.webp"} alt="" />
          <div className=" text-sm th w-full text-center pb-2 flex flex-row justify-center">
            {"Ev charging station"}
          </div>
        </li>
      );
    }
    if (amenitiesJsxArray.length !== 0) {
      setAmenitiesList(amenitiesJsxArray);
    }
  }, []);

  return (
    <div
      className={`flex-1 p-4 max-[630px]:px-2 w-full  mt-4 flex-col 
      
      
      `}
    >
      <div className="th text-2xl">Amenities</div>
          <div className=" mt-4 p-4 rounded-lg  border-[0px] mx-auto w-full   cborder flex flex-row overflow-x-auto gap-x-4 sb max-[640px]:grid max-[640px]:grid-cols-3 max-[460px]:grid-cols-2 max-[640px]:place-content-center">
            {amenitiesList ? (
              amenitiesList
            ) : (
              <div className="text-white">No amenities available</div>
            )}
          </div>
      
    </div>
  );
}
