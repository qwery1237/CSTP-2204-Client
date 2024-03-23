import React from "react";
import SortIcon from "@mui/icons-material/Sort";

export default function Sort({ isSortPopUp, sortHandler }) {
  return (
    <div className=" relative">
      <div className=" h-10 rounded-lg border-[1px] cborder flex items-center justify-center tp px-2 sbg cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header gap-x-1">
        <SortIcon />
        <div>Sort</div>
      </div>
      {isSortPopUp && (
        <div className=" absolute bottom-[-132px] left-[-42px] rounded-lg border-[1px] cborder flex flex-col tp text-sm px-4 sbg">
          <div
            onClick={() => sortHandler("likes")}
            className="  py-2 cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header"
          >
            Most liked
          </div>
          <div
            onClick={() => sortHandler("recent")}
            className=" pb-2 cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header"
          >
            Recent
          </div>
          <div
            onClick={() => sortHandler("hrated")}
            className=" pb-2 cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header"
          >
            Highest rated
          </div>
          <div
            onClick={() => sortHandler("lrated")}
            className=" pb-2 cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header"
          >
            lowest rated
          </div>
        </div>
      )}
    </div>
  );
}
