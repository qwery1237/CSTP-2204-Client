import { useEffect, useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useAuth } from "../../context/AuthContext";
import { getLevel } from "../../api/user";

export default function UserInfo({ handleActionChange }) {
  // getUserInfo from backend
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    if (!user) return;
    const { level, pointsNeeded, pointsLeft } = getLevel(user.totalPoints);
    setUserInfo({
      name: user.name,
      email: user.email,
      profileImg: user.profileImg,
      frame: user.frame,
      lv: level,
      crrEXP: pointsLeft,
      requiredEXP: pointsNeeded,
    });
  }, [user]);
  return (
    <>
      {userInfo && (
        <>
          <div className="p-2 pb-0 w-full mb-6 caret-transparent">
            <div className="w-full border-t-[1px] border-lightMode-fbg h-[88px] rounded-xl tbg-gradient flex flex-row items-center  p-4 ">
              <div className="flex flex-row gap-x-4 items-center w-full justify-between">
                <div className="flex flex-row gap-x-4 items-center flex-1">
                  <div
                    style={{
                      backgroundImage: `url(${userInfo.frame})`,
                      backgroundSize: "cover", // Adjust as needed
                      backgroundPosition: "center", // Adjust as needed
                      // Additional background properties can be added here
                    }}
                    className=" flex justify-center items-center size-[60px] rounded-full border-0"
                  >
                    <img
                      className="size-14 rounded-full object-cover"
                      src={userInfo.profileImg}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden justify-between h-full">
                    <div className="text-lightMode-header text-base font-[400] width-full overflow-hidden text-ellipsis whitespace-nowrap w-[144px] max-[315px]:w-[110px]">
                      {userInfo.name}
                    </div>
                    <div className="text-lightMode-p dark:text-darkMode-p text-xs w-[144px] overflow-hidden text-ellipsis whitespace-nowrap max-[315px]:w-[110px]">
                      {userInfo.email}
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => handleActionChange("Account Info")}
                  className=" cursor-pointer"
                >
                  <SettingsOutlinedIcon
                    sx={{ color: "white", fontSize: "28px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 flex-col mb-2 caret-transparent">
            <div className="text-lightMode-p dark:text-darkMode-p text-sm mb-1">
              Level {userInfo.lv}
            </div>
            <div className="flex flex-row h-4 rounded-full bg-lightMode-tbg cborder border-[1px]">
              <div
                className="bg-lightMode-button rounded-full"
                style={{
                  width: `${(userInfo.crrEXP / userInfo.requiredEXP) * 100}%`,
                }}
              ></div>
              <div className="flex-1"></div>
            </div>
            <div className="text-lightMode-p dark:text-darkMode-p text-sm mt-1 flex flex-row justify-end items-center">
              <div>
                {userInfo.crrEXP} / {userInfo.requiredEXP}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
