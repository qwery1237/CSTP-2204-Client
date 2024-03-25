import React, { useRef, useState } from 'react';
import ContactUsHome from './ContactUsHome';
import ContactUsChat from './ContactUsChat';
import ContactUsHelp from './ContactUsHelp';
import ContactUsNav from './ContactUsNav';

const HELPDATA = [
  {
    id: 1,
    title: 'Points still not credited?',
    title2: 'Learn more about point credit algorithm',
    data: 'Points are rewarded once two or more people verify the same price in same day. Points are then rewarded the following day to all user that meet the criteria of price verification.',
  },
  {
    id: 2,
    title: 'How to earn points?',
    title2: 'Get to know more ways to earn',
    data: 'FuelGo provide several ways to earn points, you can earn via providing real time gas prices, filling surveys about gas stations and also through inviting friends.',
  },
  {
    id: 3,
    title: 'App features',
    title2: 'Overview of all the features in the app',
    data: 'FuelGo provide real time gas prices of nearby gas station. We have sort features to match your preferences, also a map to see exact location of gas station. You are able to provide information about gas prices and gas station to earn points. Points could be used to redeem gift cards of your choice.',
  },
  {
    id: 4,
    title: 'How to invite friends',
    title2: 'Steps to send invitation link',
    data: "Navigate to profile, click on 'Invite friends' button in middle of profile nav. This will navigate to link area, you can either copy it to clipboard or share it directly.",
  },
  {
    id: 5,
    title: 'How to reedem points',
    title2: 'Steps to send invitation link',
    data: "Navigate to profile, click on 'Rewards' button in middle of profile nav. This will navigate to rewards page, you can redeem gift card, frame or avatar.",
  },
  {
    id: 6,
    title: 'How to change password',
    title2: 'Steps to change password ',
    data: "Navigate to profile, click on 'Sign out' button in bottom of profile nav. This will navigate to landing page, from there press get started and then navigate to login page, look for forget password link. Once you click the link, then enter your email. We will use your email address and send a change password link. Follow the link in email to change password.",
  },
];

export default function ContactUs({ helpDataId, setHelpDataId }) {
  const chatContainerRef = useRef(null);
  const [crrAction, setCrrAction] = useState('Home');
  const isHome = crrAction == 'Home';
  const isChat = crrAction == 'Chat';
  const isHelp = crrAction == 'Help';
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      <div
        ref={chatContainerRef}
        className={` flex-1  overflow-y-auto flex flex-col px-3 pt-3`}
      >
        {isHome && (
          <ContactUsHome
            helpDataList={HELPDATA.filter((_, i) => i < 3)}
            helpDataId={helpDataId}
            setHelpDataId={setHelpDataId}
            setCrrAction={setCrrAction}
            setIsFocused={setIsFocused}
          />
        )}
        {isChat && <ContactUsChat setHelpDataId={setHelpDataId} />}
        {isHelp && (
          <ContactUsHelp
            helpDataList={HELPDATA}
            helpDataId={helpDataId}
            setHelpDataId={setHelpDataId}
            isAutoFocus={isFocused}
          />
        )}
      </div>
      <div className='border-t-[1px] cborder'></div>
      <div className=' sticky bottom-0 m-3'>
        <ContactUsNav
          setIsFocused={  setIsFocused}
          crrAction={crrAction}
          setCrrAction={setCrrAction}
          helpDataId={helpDataId}
          setHelpDataId={setHelpDataId}
        />
      </div>
    </>
  );
}
