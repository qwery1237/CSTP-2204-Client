import React, { useState } from 'react';
import ReviewOverview from './ReviewOverview';
import AddReview from './AddReview';
import Comment from './Comment';
import Sort from './Sort';

export default function CommentSection() {
  const [isSortPopUp, setIsSortPopUp] = useState(false);
  return (
    <div className='flex-1 p-4 max-[630px]:px-2  mt-4 flex-col'>
      <div className=' flex flex-row justify-between items-center'>
        <div className='th text-2xl'>Reviews</div>
        <div className=' max-[640px]:hidden'>
          {' '}
          <div onClick={() => setIsSortPopUp((prev) => !prev)}>
            <Sort isSortPopUp={isSortPopUp} />
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-4 p-4 mt-4 max-[640px]:flex-col '>
        <div className=' flex-1  flex  flex-col gap-y-4 h-fit min-[640px]:sticky min-[640px]:top-[-280px] '>
          <ReviewOverview />
          <AddReview />
        </div>
        <div className=' flex-1 flex flex-col gap-y-4'>
          <div className=' flex flex-row justify-end min-[640px]:hidden'>
            <div onClick={() => setIsSortPopUp((prev) => !prev)}>
              <Sort isSortPopUp={isSortPopUp} />
            </div>
          </div>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
}
