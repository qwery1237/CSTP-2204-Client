// import React, { useEffect, useState } from 'react';
// import WhatshotIcon from '@mui/icons-material/Whatshot';
// export default function Icon({ size }) {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const prefersDarkMode =
//       window.matchMedia &&
//       window.matchMedia('(prefers-color-scheme: dark)').matches;
//     setIsDarkMode(prefersDarkMode);
//   }, []);
//   if (isDarkMode) {
//     return (
//       <div>
//         <svg width={0} height={0}>
//           <linearGradient id='linearColors' x1={0} y1={1} x2={1} y2={0}>
//             <stop offset={0.45} stopColor='rgba(130, 219, 247, 1)' />
//             <stop offset={1} stopColor='rgba(182, 240, 156, 1)' />
//           </linearGradient>
//         </svg>
//         <WhatshotIcon sx={{ fill: 'url(#linearColors)', fontSize: size }} />
//       </div>
//     );
//   } else {
//     return <WhatshotIcon sx={{ color: 'rgb(14,164,233)', fontSize: '28px' }} />;
//   }
// }
