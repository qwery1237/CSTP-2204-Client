import { useContext, useEffect, useState } from "react";
import Context from "../../context";
import PreferenceItem from "./PreferenceItem";
import PreferenceOptions from "./PreferenceOptions";
import { DEFAULT_PREFERENCE } from "../../Screen/Home";

export const PREFERENCES = [
  { title: "Recently updated" },
  { title: "Sort", options: ["Distance", "Rating", "Price"] },
  {
    title: "Fuel type",
    options: ["Regular", "Mid-grade", "Premium", "Diesel"],
  },
  {
    title: "Amenities",
    options: [
      "Car wash",
      "Atm",
      "Air pump",
      "Convenience store",
      "Ev charging station",
    ],
  },
];

export default function Preferences({ isList, preferences, setPreferences }) {
  const [crrPref, setCrrPref] = useState(DEFAULT_PREFERENCE);
  const [crrOptions, setCrrOptions] = useState();
  const { setGasStationPreference, gasStation } = useContext(Context);

  //TODO:
  useEffect(() => {
    if (!gasStation) return;
    const now = Date.now();
    const filtered = gasStation
      // amenity filter
      .filter((station) =>
        crrPref[3].every((amentyFilter, i) =>
          amentyFilter ? Object.values(station.amenities)[i].isValid : true
        )
      )
      // recent filter
      .filter((station) => {
        if (!crrPref[0]) return true;
        const oneMonth = 30 * 24 * 60 * 60 * 1000;
        return (
          now - Object.values(station.price)[crrPref[2]].timeStamp <= oneMonth
        );
      });
    // sort stations
    filtered.sort((station_a, station_b) => {
      switch (crrPref[1]) {
        case 0:
          return (
            station_a.distanceFromUser.replace(" km", "") -
            station_b.distanceFromUser.replace(" km", "")
          );

        case 1:
          const sumOfRatings = station_b.reviews.reduce(
            (total, obj) => total + obj.rating,
            0
          );
          let average = sumOfRatings / station_b.reviews.length;

          // Check if average is NaN, if so, set it to 0
          if (isNaN(average)) {
            average = 0;
          }

          const sumOfRatings2 = station_a.reviews.reduce(
            (total, obj) => total + obj.rating,
            0
          );
          let average2 = sumOfRatings2 / station_a.reviews.length;

          // Check if average2 is NaN, if so, set it to 0
          if (isNaN(average2)) {
            average2 = 0;
          }

          return average - average2;

        default:
          if (!Object.values(station_a.price)[crrPref[2]].price) return 1;
          if (!Object.values(station_b.price)[crrPref[2]].price) return -1;
          return (
            Object.values(station_b.price)[crrPref[2]].price -
            Object.values(station_a.price)[crrPref[2]].price
          );
      }
    });
    setGasStationPreference(filtered);
    setPreferences(crrPref);
  }, [gasStation, crrPref]);

  return (
    <>
      <div className="w-full mt-4">
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-evenly max-[415px]:justify-start overflow-x-auto gap-x-2 px-4 max-[446px]:mb-4">
            {PREFERENCES.map((item, i) => {
              if (i == 1 && !isList) {
                return;
              }
              const { title, options } = item;

              return (
                <PreferenceItem
                  key={title}
                  title={title}
                  options={options}
                  itemIndex={i}
                  setCrrPopUp={setCrrOptions}
                  crrPref={crrPref}
                  setCrrPref={setCrrPref}
                />
              );
            })}
          </div>
          <div className="w-full flex">
            <PreferenceOptions
              crrPopUp={crrOptions}
              setCrrPopUp={setCrrOptions}
              crrPref={crrPref}
              setCrrPref={setCrrPref}
            />
          </div>
        </div>
      </div>
    </>
  );
}
