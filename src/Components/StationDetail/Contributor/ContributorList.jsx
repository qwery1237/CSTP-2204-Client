import React, { useEffect, useState } from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function ContributorList({
  isMonth,
  month,
  year,
  monthContributers,
  yearContributers,
}) {
  const [contributers, setContributers] = useState(null);
  useEffect(() => {
    if (isMonth) {
      
      let arr = [];
     
      if (monthContributers) {
      
        arr = [...monthContributers];
   
      }

      for (let i = 0; i < 5; i++) {
        arr.push({ name: "- -", points: 0 });
      }
     
      setContributers(arr);
    } else {
      let arr = [];
      if (yearContributers) {
        arr = [...yearContributers];
      }
      for (let i = 0; i < 5; i++) {
        arr.push({ name: "- -", points: 0 });
      }
     
      setContributers(arr);
    }
  }, [monthContributers, yearContributers]);
  return (
    <div className=" flex-1 rounded-lg border-[1px] cborder th">
      <div className=" p-4 text-end text-lg">{isMonth ? month : year}</div>

      {contributers &&
        contributers.map((item, i) => {
          if(i > 4){
            return null
          }
          return (
            <div
              key={"contributer" + i}
              className=" flex-1 flex flex-row justify-between items-center p-2 border-t-[1px] cborder"
            >
              {i <= 2 ? (
                <div className=" flex flex-row gap-x-1 items-center">
                  <div> {item.points} </div>{" "}
                  <div
                    className={`${i === 0 && "text-[#ffd700]"} ${
                      i === 1 && "text-[#c0c0c0]"
                    } ${i === 2 && "text-[#CD7F32]"}`}
                  >
                    <EmojiEventsIcon sx={{ fontSize: 18 }} />
                  </div>
                </div>
              ) : (
                <div> {item.points}</div>
              )}
              <div>{item.name}</div>
            </div>
          );
        })}
    </div>
  );
}
