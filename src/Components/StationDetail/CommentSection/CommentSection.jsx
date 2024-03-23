import React, { useEffect, useState } from "react";
import ReviewOverview from "./ReviewOverview";
import AddReview from "./AddReview";
import Comment from "./Comment";
import Sort from "./Sort";

export default function CommentSection({
  station,
  user,
  token,
  setStation,
  timestamp,
  setTimestamp,
}) {
  const [isSortPopUp, setIsSortPopUp] = useState(false);
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    const reviewCopy = [...station.reviews];
    setReviews(reviewCopy.reverse());
  }, [station.reviews]);
  const sortHandler = (sortType) => {
    if (sortType === "recent") {
      const reviewCopy = [...station.reviews];
      setReviews(reviewCopy.reverse());
    } else if (sortType === "likes") {
      const reviewCopy = [...station.reviews];
      reviewCopy.sort((a, b) => b.likes.length - a.likes.length);
      setReviews(reviewCopy);
    } else if (sortType === "hrated") {
      const reviewCopy = [...station.reviews];
      reviewCopy.sort((a, b) => b.rating - a.likes);
      setReviews(reviewCopy);
    } else if (sortType === "lrated") {
      const reviewCopy = [...station.reviews];
      reviewCopy.sort((a, b) => b.rating - a.likes);
      reviewCopy.reverse()
      setReviews(reviewCopy);
    }
  };
  return (
    <div className="flex-1 p-4 max-[630px]:px-2  mt-4 flex-col">
      <div className=" flex flex-row justify-between items-center">
        <div className="th text-2xl">Reviews</div>
        <div className=" max-[640px]:hidden">
          {" "}
          <div onClick={() => setIsSortPopUp((prev) => !prev)}>
            <Sort sortHandler={sortHandler} isSortPopUp={isSortPopUp} />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 p-4 mt-4 max-[640px]:flex-col ">
        <div className=" flex-1  flex  flex-col gap-y-4 h-fit min-[640px]:sticky min-[640px]:top-[-280px] ">
          <ReviewOverview station={station} />
          <AddReview
          user={user}
          station={station}
            setTimestamp={setTimestamp}
            setStation={setStation}
            token={token}
            placeId={station.placeId}
          />
        </div>
        <div className=" flex-1 flex flex-col gap-y-4">
          <div className=" flex flex-row justify-end min-[640px]:hidden">
            <div onClick={() => setIsSortPopUp((prev) => !prev)}>
              <Sort sortHandler={sortHandler} isSortPopUp={isSortPopUp} />
            </div>
          </div>
          { reviews && reviews.length > 0 ? (
            reviews.map((review) => {
              return <Comment   placeId={station.placeId} token={token} user={user} key={review.email} timestamp={timestamp} review={review} />;
            })
          ) : (
            <div className=" text-lightMode-header dark:text-darkMode-header text-center text-sm">
              No comments
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
