import React, { useEffect, useState } from "react";
import ContributorList from "./ContributorList";

export default function Contributor({ station }) {
  const [month, setMonth] = useState(null);
  const [monthIndex, setMonthIndex] = useState(null);
  const [monthContributers, setMonthContributers] = useState(null);
  const [yearContributers, setYearContributers] = useState(null);
  const [year, setYear] = useState(null);
  const [isSettoMonth, setisSetToMonth] = useState(true)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    const date = new Date();
    const currentMonthIndex = date.getMonth();
    const currentMonth = monthNames[currentMonthIndex];
    setMonthIndex(currentMonthIndex);
    const currentYear = date.getFullYear();
    setMonth(currentMonth);
    setYear(currentYear);
  }, []);

  useEffect(() => {
    const pointsMap = new Map();
    const pointsMapMonth = new Map();

    if (station.priceHistory) {
      const filteredYearHistory = station.priceHistory.filter((item) => {
        const timestampYear = new Date(item.timeStamp).getFullYear();
        return timestampYear === year;
      });

      if (filteredYearHistory.length > 0) {
        filteredYearHistory.forEach((item) => {
          const { name, points } = item;
          if (pointsMap.has(name)) {
            pointsMap.set(name, pointsMap.get(name) + points);
          } else {
            pointsMap.set(name, points);
          }
        });

        let sortedResults = Array.from(pointsMap.entries())
          .map(([name, points]) => ({ name, points }))
          .sort((a, b) => b.points - a.points);

        setYearContributers(sortedResults);
      }

      if (filteredYearHistory.length > 0) {
        const filteredMonthHistory = filteredYearHistory.filter((item) => {
          const timestampMonth = new Date(item.timeStamp).getMonth();
          return timestampMonth === monthIndex;
        });
        if (filteredMonthHistory.length > 0) {
          filteredMonthHistory.forEach((item) => {
            const { name, points } = item;
            if (pointsMapMonth.has(name)) {
              pointsMapMonth.set(name, pointsMapMonth.get(name) + points);
            } else {
              pointsMapMonth.set(name, points);
            }
          });
      
          let sortedMonthResults = Array.from(pointsMapMonth.entries())
            .map(([name, points]) => ({ name, points }))
            .sort((a, b) => b.points - a.points);

          setMonthContributers(sortedMonthResults);
        }
      }
    }
  }, [station.priceHistory, monthIndex, year]);

  return (
    <div className="flex-1 p-4 max-[630px]:px-2  mt-4 flex-col">
      <div className=" flex flex-row justify-between items-center">
        <div className="th text-2xl">Contributors</div>
      </div>
      <div className=" flex flex-row justify-end mt-4 min-[520px]:hidden ">
        <div className=" flex flex-row th border-[1px] cborder rounded-lg w-[150px] cursor-pointer">
          <div onClick={()=> setisSetToMonth(true)} className={`flex-1 border-r-[1px] cborder text-center p-2 ${isSettoMonth && "tb"} `}>
            {month}
          </div>
          <div onClick={()=> setisSetToMonth(false)} className={`flex-1 text-center p-2 ${!isSettoMonth && "tb"}`}>{year}</div>
        </div>
      </div>
      <div className=" mt-4 p-4 flex-1 min-[520px]:hidden">
        {isSettoMonth ?  <ContributorList
          month={month}
          monthContributers={monthContributers}
          yearContributers={yearContributers}
          year={year}
          isMonth={true}
        /> : <ContributorList
        month={month}
        year={year}
        monthContributers={monthContributers}
        yearContributers={yearContributers}
        isMonth={false}
      />}
       
      </div>
      <div className=" mt-4 p-4 flex-row flex gap-x-4 max-[520px]:hidden">
        <ContributorList
          month={month}
          year={year}
          monthContributers={monthContributers}
          yearContributers={yearContributers}
          isMonth={true}
        />
        <ContributorList
          month={month}
          year={year}
          monthContributers={monthContributers}
          yearContributers={yearContributers}
          isMonth={false}
        />
      </div>
    </div>
  );
}
