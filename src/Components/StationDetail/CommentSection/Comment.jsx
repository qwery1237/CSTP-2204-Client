import React, { useEffect, useState } from "react";
import { ThumbUp } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { commentLike, commentUnLike } from "../../../api/user";
export default function Comment({ review, timestamp, user, token, placeId }) {
  const [howLongAgo, setHowLongAgo] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [noOfLikes, setNoOfLikes] = useState(0);
  useEffect(() => {
    const timeDifferenceInSeconds = Math.floor(
      (timestamp - review.timeStamp) / 1000
    );
    let timeDifference = "";

    if (timeDifferenceInSeconds < 60) {
      timeDifference = `${timeDifferenceInSeconds} sec ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      timeDifference = `${Math.floor(timeDifferenceInSeconds / 60)} min ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      timeDifference = `${Math.floor(timeDifferenceInSeconds / 3600)} hr ago`;
    } else if (timeDifferenceInSeconds < 2592000) {
      timeDifference = `${Math.floor(timeDifferenceInSeconds / 86400)} day ago`;
    } else if (timeDifferenceInSeconds < 31536000) {
      timeDifference = `${Math.floor(
        timeDifferenceInSeconds / 2592000
      )} month ago`;
    } else {
      timeDifference = `${Math.floor(
        timeDifferenceInSeconds / 31536000
      )} year ago`;
    }
    setHowLongAgo(timeDifference);
  }, [timestamp]);
  useEffect(() => {
    if (review.likes.includes(user.email)) {
      setIsLiked(true);
    }
    if (review.likes) {
      setNoOfLikes(review.likes.length);
    }
  }, []);
  const likeHandler = async () => {
    if (isLiked) {
      const result = await commentUnLike(token, placeId, review.email);
      if (result.success) {
        setIsLiked(false);
        setNoOfLikes((prevLikes) => prevLikes - 1);
      }
    } else {
      const result = await commentLike(token, placeId, review.email);
      if (result.success) {
        setIsLiked(true);
        setNoOfLikes((prevLikes) => prevLikes + 1);
      }
    }
  };
  return (
    <div className="w-full rounded-lg border-[1px] cborder p-4 flex-col flex">
      <div className="flex flex-row gap-x-2">
        <div
          style={{
            backgroundImage: 'url("/frame/level5.jpg")',
            backgroundSize: "cover",

            backgroundPosition: "center",
          }}
          className=" flex justify-center items-center size-[40px] rounded-full border-0"
        >
          <img
            onClick={() => setIsProfilePopUpHandler()}
            className="size-9 rounded-full  cursor-pointer object-cover relative"
            src="/oilrig.jpg"
            alt=""
          />
        </div>

        <div className=" flex flex-col justify-evenly">
          <div className=" text-sm th">Harinder</div>
          <div className=" text-xs tp">Level 2</div>
        </div>
        <div className="flex-1"></div>
        <div className=" tp flex justify-between items-center flex-col">
          <div
            onClick={() => likeHandler()}
            className={` cursor-pointer ${isLiked ? "th" : "tp"}`}
          >
            <ThumbUp sx={{ fontSize: 20 }} />
          </div>

          <div className=" text-xs  tp">{noOfLikes}</div>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-2">
        <div className="flex flex-row gap-x-[1px]">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`${
                review.rating >= index + 1 ? " text-[#Ffd700]" : " tp"
              } `}
            >
              <StarIcon sx={{ fontSize: 16 }} />
            </div>
          ))}
        </div>
        <div className="text-xs tp">{howLongAgo}</div>
      </div>
      <div className=" text-sm th my-2">{review?.comment}</div>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-2  max-h-[200px] overflow-y-auto">
        {review.photosVideos &&
          review.photosVideos.length > 0 &&
          review.photosVideos.map((item) => {
            return <img key={item} className="" src={item} alt="" />;
          })}
      </div>
    </div>
  );
}
