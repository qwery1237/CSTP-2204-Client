// import React, { useState, useRef, useEffect } from 'react';
// import { TextField, Grid, ThemeProvider } from '@mui/material';
// import WhatshotIcon from '@mui/icons-material/Whatshot';

// import theme from '../Theme/Mui';
// import googleImg from '/google.png';
// import facebookImg from '/facebook.png';
// import BgBlackOpacity from '../BgBlackOpacity';
// import Otp from './Otp';
// import EditIcon from '@mui/icons-material/Edit';
// import CloseIcon from '@mui/icons-material/Close';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Loading from '../Loading';
// import Icon from '../Icon';
// import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
// import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
// import serverLink from '../../serverLink';
// import CustomInput from '../UI/CustomInput';
// import { MdOutlineMail, MdLockOutline } from 'react-icons/md';
// import CustomButton from '../UI/CustomButton';

// export default function AuthPageUiWrapper({ isLogin = true }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [errorEmailBorder, setErrorEmailBorder] = useState(false);
//   const [errorPasswordBorder, setErrorPasswordBorder] = useState(false);
//   const [otpPopUp, setOtpPopUp] = useState(false);
//   const [isOtpValid, setIsOtpValid] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
//   const navigate = useNavigate();
//   const [img, setImg] = useState(
//     'https://res.cloudinary.com/dddggrofv/image/upload/v1691608835/profile_lxq8sq.jpg'
//   );
//   const [userName, setUserName] = useState('');
//   const handleLogin = async (e) => {
//     setError('');
//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         serverLink + '/auth/emaillogin',
//         {
//           email: email,
//           password: password,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       const { success, fault, error, token } = response.data;
//       setIsLoading(false);
//       if (success === false) {
//         if (fault === 'none') {
//           setError(error);
//         } else if (fault === 'password') {
//           setErrorPasswordBorder(true);
//           setError(error);
//         } else if (fault === 'email') {
//           setErrorEmailBorder(true);
//           setError(error);
//         }
//       } else if (success === true) {
//         localStorage.setItem('fuelgotoken', JSON.stringify(token));
//         navigate('/home');
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error('Network error:', error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setErrorEmailBorder(false);
//     setErrorPasswordBorder(false);
//     if (isLogin) {
//       handleLogin();
//     } else {
//       handlesignup();
//     }
//   };

//   const handlesignup = async () => {
//     setError('');
//     if (!isAgreedToTerms) {
//       setError('Agree to terms and conditions to continue');
//       return;
//     }
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         serverLink + '/auth/emailsignup',
//         {
//           email: email,
//           password: password,
//           isAgreedToTerms: isAgreedToTerms,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       const { success, fault, error } = response.data;
//       setIsLoading(false);
//       if (success === false) {
//         if (fault === 'none') {
//           setError(error);
//         } else if (fault === 'password') {
//           setErrorPasswordBorder(true);
//           setError(error);
//         } else if (fault === 'email') {
//           setErrorEmailBorder(true);
//           setError(error);
//         }
//       } else if (success === true) {
//         setOtpPopUp(true);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error('Network error:', error);
//     }
//   };
//   return (
//     <>
//       {isLoading && (
//         <div className=' absolute top-0 w-screen h-screen z-[50]'>
//           {' '}
//           <Loading />
//         </div>
//       )}
//       <AuthPageUiWrapperComp>
//         {isOtpValid ? (
//           <UserDataForm
//             setImg={setImg}
//             setUserName={setUserName}
//             img={img}
//             userName={userName}
//             setIsLoading={setIsLoading}
//             email={email}
//           />
//         ) : (
//           <AuthForm
//             errorEmailBorder={errorEmailBorder}
//             errorPasswordBorder={errorPasswordBorder}
//             email={email}
//             password={password}
//             setEmail={setEmail}
//             setPassword={setPassword}
//             isLogin={isLogin}
//             handleSubmit={handleSubmit}
//             error={error}
//             setIsAgreedToTerms={setIsAgreedToTerms}
//             setIsLoading={setIsLoading}
//             setError={setError}
//             setImg={setImg}
//             setUserName={setUserName}
//             setIsOtpValid={setIsOtpValid}
//           />
//         )}
//       </AuthPageUiWrapperComp>

//       {otpPopUp && (
//         <>
//           <BgBlackOpacity>
//             {' '}
//             <Otp
//               email={email}
//               setIsOtpValid={setIsOtpValid}
//               setOtpPopUp={setOtpPopUp}
//             />
//           </BgBlackOpacity>
//         </>
//       )}
//     </>
//   );
// }

// function ConfirmationPopUp({ setPopUp }) {
//   const ConfirmationPopUpChecker = (e) => {
//     if (e && e.target) {
//       if (e.target.id === 'ConfirmationPopUp') {
//         setPopUp(false);
//       }
//     }
//   };
//   return (
//     <div
//       onClick={(e) => ConfirmationPopUpChecker(e)}
//       className=' absolute top-0 right-0  '
//     >
//       <div
//         id='ConfirmationPopUp'
//         className='w-screen h-screen flex justify-center items-center cursor-pointer'
//       >
//         {' '}
//         <div className='max-[640px]:absolute bottom-0'>
//           <div className=' relative z-[2] cursor-default'>
//             <div
//               onClick={() => setPopUp(false)}
//               className=' absolute top-1 right-1 cursor-pointer'
//             >
//               <CloseIcon className=' text-lightMode-header dark:text-darkMode-header' />
//             </div>

//             <div className=' py-4 bg-lightMode-sbg dark:bg-darkMode-sbg rounded-lg flex flex-col w-[400px] gap-y-4  max-[640px]:max-w-full max-[640px]:w-screen max-[640px]:rounded-b-none '>
//               <div className='w-full text-center text-lg   text-lightMode-header dark:text-darkMode-header border-b-[1px] border-lightMode-border dark:border-darkMode-border pb-4'>
//                 Profile Image
//               </div>
//               <div className='w-full px-4 flex flex-col gap-y-4 '>
//                 <CustomButton data={'Update Image'}></CustomButton>
//                 <button
//                   className='px-2 w-full h-10 bg-lightMode-tbg dark:bg-darkMode-tbg
//                    border-lightMode-border dark:border-darkMode-border  text-lightMode-p dark:text-darkMode-p  font-medium rounded-sm hover:bg-lightMode-bg dark:hover:bg-darkMode-bg'
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function UserDataForm({
//   setIsLoading,
//   email,
//   img,
//   setImg,
//   userName,
//   setUserName,
// }) {
//   const [popUp, setPopUp] = useState(false);
//   const [error, setError] = useState('');

//   const [errorNameBorder, setErrorNameBorder] = useState(false);
//   const [localLink, setLocalLink] = useState('');
//   const navigate = useNavigate();
//   const handleUserData = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorNameBorder(false);

//     try {
//       const response = await axios.post(
//         serverLink + '/auth/adduserdata',
//         {
//           email: email,
//           name: userName,
//           profileImg: img,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       const { success, error, token } = response.data;
//       setIsLoading(false);
//       if (success === true) {
//         localStorage.setItem('fuelgotoken', JSON.stringify(token));
//         navigate('/home');
//       } else {
//         setErrorNameBorder(true);
//         setError(error);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error('Network error:', error);
//     }
//   };
//   const handleUpload = async (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', 'unsigned_upload_preset');

//       const url = `https://api.cloudinary.com/v1_1/dddggrofv/image/upload`;

//       try {
//         const response = await fetch(url, {
//           method: 'POST',
//           body: formData,
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           console.error('Error uploading media:', errorData);
//           return;
//         }
//         const data = await response.json();
//         setImg(data.secure_url);
//       } catch (error) {
//         console.error('Error uploading media:', error);
//       }
//     }
//   };

//   return (
//     <>
//       {/* {popUp && (
//         <BgBlackOpacity>
//           {" "}
//           <ConfirmationPopUp setPopUp={setPopUp} />
//         </BgBlackOpacity>
//       )} */}
//       <h2 className=' text-white text-2xl font-semibold'>Account Info</h2>
//       <h4 className=' text-lightMode-p dark:text-darkMode-p text-sm py-3 pb-3'>
//         Profile Image (optional)
//       </h4>
//       <div className=' relative w-fit mb-4'>
//         <img
//           className=' size-[100px] rounded-full object-contain'
//           src={img}
//           alt=''
//         />
//         <div className=' absolute bottom-0 right-[-4px] rounded-full bg-white p-2 shadow-md cursor-pointer'>
//           <input
//             type='file'
//             accept='image/*'
//             onChange={(event) => handleUpload(event)}
//             className=' rounded-full w-10 h-10 absolute  bottom-[1px] right-[0px] bg-transparent cursor-pointer opacity-0'
//           ></input>
//           <EditIcon />
//         </div>
//       </div>
//       <div className=' text-sm text-lightMode-p dark:text-darkMode-p mt-1 pb-1'>
//         Name*
//       </div>
//       <form onSubmit={(e) => handleUserData(e)} noValidate>
//         <div className='w-full relative'>
//           <input
//             autoFocus
//             style={errorNameBorder ? { borderColor: 'rgb(211 47 47 )' } : {}}
//             autoComplete='name'
//             label='Name'
//             type='name'
//             value={userName}
//             placeholder='Name'
//             onChange={(e) => setUserName(e.target.value)}
//             className='mt-1 pl-10 customInput mb-3'
//           />
//           <div className=' absolute top-[10px] left-2'>
//             <BadgeOutlinedIcon sx={{ color: '#747c88' }} />
//           </div>
//         </div>
//         {error && (
//           <div className='w-full text-center mt-2 text-xs text-lightMode-error dark:text-darkMode-error '>
//             {error}
//           </div>
//         )}
//         <div className='mt-4'></div>

//         <CustomButton>Finish</CustomButton>
//         {/* <Button type='submit' data='Finish' /> */}
//         {/* </ThemeProvider> */}
//       </form>
//     </>
//   );
// }

// function AuthForm({
//   errorEmailBorder,
//   errorPasswordBorder,
//   email,
//   password,
//   setEmail,
//   setPassword,
//   isLogin,
//   handleSubmit,
//   error,
//   setIsAgreedToTerms,
//   setIsLoading,
//   setError,
//   setImg,
//   setUserName,
//   setIsOtpValid,
// }) {
//   const navigate = useNavigate();
//   return (
//     <>
//       {/* <div className=" absolute pb-4">
//         <WhatshotIcon sx={{ color: "rgb(14,165,233)", fontSize: "28px" }} />
//       </div> */}

//       <div className='h-full  '>
//         <h2 className=' text-white text-2xl font-semibold mb-4'>
//           {isLogin ? 'Welcome back!' : 'Create an account'}
//         </h2>
//         {/* <h4 className=" text-lightMode-p dark:text-darkMode-p mb-[10px] mt-1  ">
//           {isLogin
//             ? "Sign in to your account"
//             : "Create an account to enjoy more features"}
//         </h4> */}

//         <form onSubmit={handleSubmit} noValidate>
//           <div className='flex flex-col gap-y-6 mb-6 mt-6'>
//             <CustomInput
//               label='Email *'
//               paddingLeft='40px'
//               placeHolder='Email'
//               handleChange={(e) => setEmail(e.target.value)}
//             >
//               <MdOutlineMail className='absolute left-2 tp text-2xl bottom-[8px]' />
//             </CustomInput>
//             <CustomInput
//               label='Password *'
//               paddingLeft='40px'
//               placeHolder='Password'
//               handleChange={(e) => setPassword(e.target.value)}
//             >
//               <MdLockOutline className='absolute left-2 tp text-2xl bottom-[8px]' />
//             </CustomInput>
//           </div>
//           {/* Previous Code */}
//           {/* <div className=' text-sm th'>Email *</div>
//           <div className='w-full relative'>
//             <input
//               autoFocus
//               style={errorEmailBorder ? { borderColor: 'rgb(211 47 47 )' } : {}}
//               autoComplete='email'
//               label='Email'
//               type='email'
//               value={email}
//               placeholder='Email'
//               onChange={(e) => setEmail(e.target.value)}
//               className='mt-1 pl-10 customInput mb-3'
//             />
//             <div className=' absolute top-[10px] left-2'>
//               <EmailOutlinedIcon sx={{ color: '#747c88' }} />
//             </div>
//           </div>
//           <div className=' text-sm th'>Password *</div>
//           <div className='w-full relative'>
//             <input
//               style={
//                 errorPasswordBorder ? { borderColor: 'rgb(211 47 47 )' } : {}
//               }
//               label='Password'
//               type='password'
//               placeholder='Password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className='mt-1 pl-10 customInput mb-3'
//             />

//             <div className=' absolute top-[10px] left-2 ms'>
//               <LockOpenOutlinedIcon sx={{ color: '#747c88' }} />
//             </div>
//           </div> */}
//           {isLogin ? (
//             <>
//               <div className='w-full text-end text-lightMode-button dark:text-darkMode-button text-sm pb-3 cursor-pointer'>
//                 <span onClick={() => navigate('/forgetpassword')}>
//                   Forget password?
//                 </span>
//               </div>
//             </>
//           ) : (
//             <label className='inline-flex items-center mb-3'>
//               <input
//                 onClick={() => setIsAgreedToTerms((prevState) => !prevState)}
//                 type='checkbox'
//                 className='form-checkbox h-[14px] w-[14px]  transition duration-150 ease-in-out checkbox border-[1px] border-lightMode-border dark:border-darkMode-border:'
//               />
//               <span className='ml-2 text-sm text-lightMode-p dark:text-darkMode-p'>
//                 I agree to the terms and conditions
//               </span>
//             </label>
//           )}
//           {/* {error && (
//             <div className='w-full text-center mb-2 text-xs text-lightMode-error dark:text-darkMode-error '>
//               {error}
//             </div>
//           )} */}
//           {/* <Button type='submit' data='Submit' /> */}

//           {/* ToDo: add real function on login button and signin button*/}
//           <CustomButton />
//         </form>
//         <div className=' text-lightMode-p text-sm dark:text-darkMode-p mt-4 mb-4 flex flex-row w-full items-center justify-center'>
//           {isLogin ? (
//             <h4 className='flex flex-row'>
//               Don't have an account?{' '}
//               <button
//                 onClick={() => navigate('/signup')}
//                 className='pl-1  text-lightMode-button dark:text-lightMode-button cursor-pointer'
//               >
//                 {' '}
//                 Register Now{' '}
//               </button>
//             </h4>
//           ) : (
//             <h4 className='flex flex-row text-sm'>
//               Already have an account?{' '}
//               <button
//                 onClick={() => navigate('/login')}
//                 className='pl-1  text-lightMode-button dark:text-lightMode-button cursor-pointer'
//               >
//                 Login Now{' '}
//               </button>
//             </h4>
//           )}
//         </div>

//         <div className='w-full relative mt-1'>
//           <div className='absolute top-0 border-b-[1px] border-lightMode-p dark:border-darkMode-p w-full'>
//             <div className='absolute top-[-10px] text-lightMode-p dark:text-darkMode-p w-full'>
//               <div className='w-full flex flex-row justify-center'>
//                 {' '}
//                 <div
//                   className='  text-sm bg-lightMode-sbg dark:bg-darkMode-sbg max-[640px]:bg-lightMode-bg
//                 dark:max-[640px]:bg-darkMode-bg rounded-full
//                 px-1'
//                 >
//                   or
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <GoogleOAuthProvider clientId='698921458629-k410ff2u0hnkl6bap113t8f9vepj8eoq.apps.googleusercontent.com'>
//           <OAuth
//             setIsLoading={setIsLoading}
//             setError={setError}
//             setImg={setImg}
//             setUserName={setUserName}
//             setEmail={setEmail}
//             setIsOtpValid={setIsOtpValid}
//           />
//         </GoogleOAuthProvider>
//       </div>
//     </>
//   );
// }
// function OAuth({
//   setIsLoading,
//   setError,
//   setImg,
//   setUserName,
//   setEmail,
//   setIsOtpValid,
// }) {
//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => {
//       axios
//         .get(
//           `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
//           {
//             headers: {
//               Authorization: `Bearer ${codeResponse.access_token}`,
//               Accept: 'application/json',
//             },
//           }
//         )
//         .then((res) => {
//           setError('');
//           setIsLoading(true);
//           axios
//             .post(
//               serverLink + '/auth/oauth',
//               {
//                 email: res.data.email,
//               },
//               {
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//               }
//             )
//             .then((res2) => {
//               setIsLoading(false);
//               if (res2.data.success === false) {
//                 setError(res2.data.error);
//               } else {
//                 if (res2.data.stageTwo === true) {
//                   setUserName(res.data.given_name + ' ' + res.data.family_name);
//                   setImg(res.data.picture);
//                   setEmail(res.data.email);
//                   setIsOtpValid(true);
//                 } else {
//                   console.log(res2.data.token);
//                 }
//               }
//             })
//             .catch((err) => console.log(err));
//         })
//         .catch((err) => console.log(err));
//     },
//     onError: (error) => console.log('Login Failed:', error),
//   });

//   return (
//     <div className='flex flex-row justify-between items-center gap-x-4 pt-5'>
//       <CustomButton bgColor='#141d2c' handleClick={login} hoverDarker>
//         {' '}
//         <div className='flex items-center justify-center'>
//           <img
//             className='w-6  cursor-pointer  rounded-full'
//             src={googleImg}
//             alt=''
//           />

//           <div className='ml-2 font-[500] text-lightMode-p dark:text-darkMode-p text-xs'>
//             Google
//           </div>
//         </div>
//       </CustomButton>
//       {/* <div
//         onClick={() => login()}
//         className=' cursor-pointer rounded-lg bg-lightMode-tbg hover:bg-lightMode-bg dark:hover:bg-darkMode-bg dark:bg-darkMode-tbg flex flex-row items-center flex-1 justify-center h-10 px-2'
//       >
//         <img
//           className='w-6  cursor-pointer  rounded-full'
//           src={googleImg}
//           alt=''
//         />

//         <div className='ml-2 font-[500] text-lightMode-p dark:text-darkMode-p text-xs'>
//           Google
//         </div>
//       </div> */}
//       {/* <div className="cursor-pointer rounded-lg hover:bg-lightMode-bg dark:hover:bg-darkMode-bg  bg-lightMode-tbg dark:bg-darkMode-tbg flex flex-row items-center flex-1 justify-center h-10 px-2">
//         <img
//           className="w-5 cursor-pointer  rounded-full"
//           src={facebookImg}
//           alt=""
//         />
//         <div className="ml-3 font-[500] text-lightMode-p dark:text-darkMode-p text-xs">
//           Facebook
//         </div>
//       </div> */}
//     </div>
//   );
// }

// export function AuthPageUiWrapperComp({ children }) {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const updateMousePosition = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', updateMousePosition);

//     return () => {
//       window.removeEventListener('mousemove', updateMousePosition);
//     };
//   }, []);
//   const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   const [name, setName] = useState('FUELGO');
//   const [interval, setInterval] = useState(true);

//   function setNewName(n) {
//     setName(n);
//   }
//   useEffect(() => {
//     handleMouseEnter();
//   }, []);
//   async function updateNameWithDelay(charArray, charArray2, charArray3) {
//     for (let i = 0; i < charArray.length; i++) {
//       for (let j = 0; j < charArray2.length; j++) {
//         let found = false;

//         if (charArray3[i] === charArray2[j]) {
//           charArray[i] = charArray2[j];
//           const newName2 = charArray.join('');
//           await sleep(30);
//           found = true;
//           setName(newName2);
//           break;
//         } else if (!found) {
//           let newArr = [...charArray];
//           newArr[i] = charArray2[j];
//           const newName3 = newArr.join('');
//           await sleep(30);

//           setName(newName3);
//         }
//       }
//     }
//   }

//   function handleMouseEnter() {
//     if (interval) {
//       setInterval(false); // Set interval to false to indicate function is running
//       let oldname = 'FUELGO';
//       let charArray2 = letters.split('');
//       let charArray3 = oldname.split('');
//       let newName = '';
//       for (let i = 0; i < 6; i++) {
//         const randomIndex = Math.floor(Math.random() * charArray2.length);
//         newName += charArray2[randomIndex];
//       }

//       let charArray = newName.split('');

//       setNewName(newName);

//       updateNameWithDelay(charArray, charArray2, charArray3)
//         .then(() => {
//           setInterval(true); // Set interval back to true when function is done
//         })
//         .catch((error) => {
//           console.error('Error occurred:', error);
//           setInterval(true); // Set interval back to true if there's an error
//         });
//     }
//   }
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const userAgent = window.navigator.userAgent.toLowerCase();
//     const isMobileDevice = /mobile|tablet|ip(ad|hone|od)|android/i.test(
//       userAgent
//     );
//     setIsMobile(isMobileDevice);
//   }, []);

//   function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }

//   return (
//     <>
//       {!isMobile && (
//         <div className=' absolute top-0 z-10'>
//           <div className='relative w-screen h-screen overflow-hidden'>
//             <div
//               className='glowing-cursor'
//               style={{ left: mousePosition.x, top: mousePosition.y }}
//             ></div>
//           </div>
//         </div>
//       )}

//       {/* <div className="absolute top-3 w-screen text-center min-[640px]:hidden z-30">
//         {" "}
//         <WhatshotIcon sx={{ color: "rgb(14,165,233)", fontSize: "50px" }} />
//       </div> */}
//       {/* header */}
//       <div className=' w-screen min-h-screen h-auto bg-lightMode-bg dark:bg-darkMode-bg flex justify-center items-center '>
//         <div className=' absolute  z-30'>
//           <div className='px-4'>
//             <div className='  w-[800px] max-[840px]:w-[calc(100vw-32px)] h-[500px] bg-lightMode-sbg dark:bg-darkMode-sbg max-[640px]:bg-transparent dark:max-[640px]:bg-transparent max-[640px]:border-transparent dark:max-[640px]:border-transparent rounded-lg min-[640px]:shadow-[0px_0px_6px_#e2e8f033] min-[640px]:dark:shadow-[0px_0px_6px_#e2e8f033] flex flex-row overflow-hidden'>
//               <div
//                 onMouseEnter={handleMouseEnter}
//                 className=' relative flex-1 w-full h-full max-[640px]:hidden overflow-hidden'
//               >
//                 <div className='screen-image'></div>
//                 <div className='screen-overlay'></div>
//                 <div className=' absolute z-30 top-0 w-full h-full p-4'>
//                   <div className='w-full h-full border-[3px] border-lightMode-border rounded-lg flex flex-col items-center justify-end'>
//                     <WhatshotIcon
//                       sx={{ color: 'rgb(14,165,233)', fontSize: '100px' }}
//                     />
//                     {/* <Icon size={100}/> */}
//                     <div className='flex flex-row  justify-center gap-x-1'>
//                       <div className=' blur-[2px] bg-lightMode-button  w-10 h-[2px] my-6'></div>
//                       <div className=' blur-[2px] bg-lightMode-button  w-10 h-[2px] my-6'></div>
//                     </div>
//                     <div className='FuelGoLogoAuthWrap'>
//                       <div
//                         className='FuelGoLogoAuth pb-6 flex flex-row'
//                         data-value='FuelGo'
//                       >
//                         <div>{name.slice(0, -2)}</div>

//                         <div className='text-lightMode-button '>
//                           {name.slice(-2)}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className='border-lightMode-border dark:border-darkMode-border border-r-[1px] max-[640px]:hidden'></div>
//               <div className='flex-1 flex flex-col '>
//                 <div className='p-4 h-full relative max-[520px]:px-0'>
//                   {' '}
//                   {children}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export function ForgetPasswordComp({ isLogin = true }) {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [errorEmailBorder, setErrorEmailBorder] = useState(false);
//   const [isEmailSent, setIsEmailSent] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);
//   const submitEmail = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorEmailBorder(false);
//     try {
//       const response = await axios.post(
//         serverLink + '/auth/forgetpassword',
//         {
//           email: email,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       const { success, error } = response.data;
//       setIsLoading(false);
//       if (success === true) {
//         setIsEmailSent(true);
//       } else {
//         setErrorEmailBorder(true);
//         setError(error);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error('Network error:', error);
//     }
//   };
//   return (
//     <>
//       {isLoading && (
//         <div className=' absolute top-0 w-screen h-screen z-[50]'>
//           {' '}
//           <Loading />
//         </div>
//       )}

//       <AuthPageUiWrapperComp>
//         {isEmailSent ? (
//           <div>
//             <h4 className=' text-lightMode-p dark:text-darkMode-p '>
//               Email is sent with a link to change password, check spams as well
//             </h4>
//           </div>
//         ) : (
//           <ForgetPasswordGetEmail
//             submit={submitEmail}
//             email={email}
//             error={error}
//             errorEmailBorder={errorEmailBorder}
//             setEmail={setEmail}
//           />
//         )}
//       </AuthPageUiWrapperComp>
//     </>
//   );
// }

// function ForgetPasswordGetEmail({
//   email,
//   setEmail,
//   error,
//   errorEmailBorder,
//   submit,
// }) {
//   const navigate = useNavigate();

//   return (
//     <>
//       <h2 className=' text-white text-2xl font-semibold'>Forget password?</h2>
//       <h4 className=' text-lightMode-p dark:text-darkMode-p text-sm py-2 pb-3'>
//         We will send an email, follow the link in email to change password
//       </h4>
//       <form onSubmit={submit} noValidate>
//         <CustomInput
//           label='Email *'
//           paddingLeft='40px'
//           placeHolder='Email'
//           handleChange={(e) => setEmail(e.target.value)}
//           isInvalid={!!error}
//           errorMessage={error}
//         >
//           <MdOutlineMail className='absolute left-2 tp text-2xl bottom-[8px]' />
//         </CustomInput>
//         {/* <div className=' text-sm text-lightMode-p dark:text-darkMode-p my-1'>
//           Email*
//         </div>
//         <div className='w-full relative'>
//           <input
//             autoFocus
//             style={errorEmailBorder ? { borderColor: 'rgb(211 47 47 )' } : {}}
//             label='Email'
//             type='email'
//             value={email}
//             placeholder='Email'
//             onChange={(e) => setEmail(e.target.value)}
//             className='mt-1 pl-10 customInput mb-3'
//           />
//           <div className=' absolute top-[10px] left-2'>
//             <EmailOutlinedIcon sx={{ color: '#747c88' }} />
//           </div>
//         </div>
//         {error && (
//           <div className='w-full text-center mt-2 text-xs text-lightMode-error dark:text-darkMode-error '>
//             {error}
//           </div>
//         )} */}
//         <div className='mt-4'></div>
//         <CustomButton />
//         {/* <Button type='submit' data='Submit' /> */}
//       </form>
//       <h4 className=' text-sm  w-full text-center text-lightMode-p dark:text-darkMode-p py-4 pb-3'>
//         Back to{' '}
//         <span
//           className='cursor-pointer text-lightMode-button dark:text-darkMode-button'
//           onClick={() => navigate('/login')}
//         >
//           {' '}
//           log in
//         </span>
//       </h4>
//     </>
//   );
// }

// export function ChangePassWordComp() {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [errorPasswordBorder, setErrorPasswordBorder] = useState(false);
//   const [errorConfirmPasswordBorder, setErrorConfirmPasswordBorder] =
//     useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   let { id } = useParams();
//   const navigate = useNavigate();
//   useEffect(() => {
//     changePasswordParamVerification();
//   }, []);

//   const changePasswordParamVerification = async () => {
//     try {
//       const response = await axios.post(
//         serverLink + '/auth/changepasswordparamverification',
//         {
//           id: id,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       const { success } = response.data;
//       if (success === false) {
//         navigate('/error');
//       }
//     } catch (error) {
//       navigate('/error');
//       console.error('Network error:', error);
//     }
//   };

//   const submitPassword = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
//     setErrorPasswordBorder(false);
//     setErrorConfirmPasswordBorder(false);
//     try {
//       const response = await axios.post(
//         serverLink + '/auth/changepassword',
//         {
//           id: id,
//           password: password,
//           confirmPassword: confirmPassword,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       const { success, error, token, fault } = response.data;
//       setIsLoading(false);
//       console.log(response.data);
//       if (success === true) {
//         localStorage.setItem('fuelgotoken', JSON.stringify(token));
//       } else {
//         if (fault === 'badlink') {
//           navigate('/error');
//         } else if (fault === 'password') {
//           setErrorPasswordBorder(true);

//           setError(error);
//         } else if (fault === 'confirmpassword') {
//           setErrorConfirmPasswordBorder(true);
//           setError(error);
//         }
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error('Network error:', error);
//     }
//   };
//   return (
//     <>
//       {isLoading && (
//         <div className=' absolute top-0 w-screen h-screen z-[50]'>
//           {' '}
//           <Loading />
//         </div>
//       )}
//       <AuthPageUiWrapperComp>
//         <h2 className=' text-white text-2xl font-semibold'>Change password</h2>
//         <h4 className=' text-lightMode-p text-sm dark:text-darkMode-p py-2 pb-3'>
//           Password must be 6 or more characters long
//         </h4>
//         <form onSubmit={submitPassword} noValidate>
//           <div className=' text-sm text-lightMode-p dark:text-darkMode-p mt-1'>
//             Password*
//           </div>
//           <div className='w-full relative'>
//             <input
//               style={
//                 errorPasswordBorder ? { borderColor: 'rgb(211 47 47 )' } : {}
//               }
//               label='Password'
//               type='password'
//               placeholder='Password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className='mt-1 pl-10 customInput mb-3'
//             />

//             <div className=' absolute top-[10px] left-2 ms'>
//               <LockOpenOutlinedIcon sx={{ color: '#747c88' }} />
//             </div>
//           </div>
//           <div className=' text-sm text-lightMode-p dark:text-darkMode-p mt-1'>
//             Confirm password*
//           </div>
//           <div className='w-full relative'>
//             <input
//               style={
//                 errorConfirmPasswordBorder
//                   ? { borderColor: 'rgb(211 47 47 )' }
//                   : {}
//               }
//               label='Confirm password'
//               type='password'
//               placeholder='Confirm password'
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className='mt-1 pl-10 customInput mb-3'
//             />

//             <div className=' absolute top-[10px] left-2 ms'>
//               <LockOpenOutlinedIcon sx={{ color: '#747c88' }} />
//             </div>
//           </div>
//           {/* <ThemeProvider theme={theme}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   autoFocus={true}
//                   error={errorPasswordBorder}
//                   variant="outlined"
//                   fullWidth
//                   className=" caret-white bg-lightMode-tbg dark:bg-darkMode-tbg rounded-sm text-lightMode-p"
//                   size="small"
//                   color="primary"
//                   label="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   error={errorConfirmPasswordBorder}
//                   variant="outlined"
//                   fullWidth
//                   className=" caret-white bg-lightMode-tbg dark:bg-darkMode-tbg rounded-sm text-lightMode-p"
//                   size="small"
//                   color="primary"
//                   label="confirm password"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                 />
//               </Grid>
//             </Grid> */}
//           {error && (
//             <div className='w-full text-center mt-2 text-xs text-lightMode-error dark:text-darkMode-error '>
//               {error}
//             </div>
//           )}
//           <div className='mt-4'></div>

//           <CustomButton />
//           {/* </ThemeProvider> */}
//         </form>
//         <h4 className=' text-sm  w-full text-center text-lightMode-p dark:text-darkMode-p py-4 pb-3'>
//           Back to{' '}
//           <span
//             className='cursor-pointer text-lightMode-button dark:text-darkMode-button'
//             onClick={() => navigate('/login')}
//           >
//             {' '}
//             log in
//           </span>
//         </h4>
//       </AuthPageUiWrapperComp>
//     </>
//   );
// }
