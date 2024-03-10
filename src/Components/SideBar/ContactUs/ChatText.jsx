import React from 'react';

export default function ChatText({ isUser, text }) {
  return (
    <div
      className={`flex ${
        isUser ? 'pl-6 justify-end' : 'pr-6 justify-start'
      } w-full rounded-lg `}
    >
      <div
        className={` ${isUser ? ' bgbtn' : ' tbg'} rounded-lg text-sm p-3 th`}
      >
        {text}
      </div>
    </div>
  );
}
