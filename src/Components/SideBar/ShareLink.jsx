import { useEffect, useState } from "react";
import AddLinkOutlinedIcon from "@mui/icons-material/AddLinkOutlined";
import { useAuth } from "../../context/AuthContext";
import { getFriendInvitationLink } from "../../api/user";
import { useLocation } from "react-router-dom";

export default function ShareLink() {
  const { token } = useAuth();
  const [link, setLink] = useState();
  const location = useLocation();

  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  useEffect(() => {
    getInvitationLink();
  }, []);
  const getInvitationLink = async () => {
    const path = window.origin;

    const tk = await getFriendInvitationLink(token);
    setLink(path + "/invite/" + tk);
  };
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setShowCopiedMessage(true);

        setTimeout(() => {
          setShowCopiedMessage(false);
        }, 2000);
      })
      .catch((error) => {
        alert("Error copying link to clipboard:", error);
      });
  };
  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Your App Title",
        text: "Check out this link!",
        url: link,
      });
      console.log("Link shared successfully");
    } catch (error) {
      console.error("Error sharing link:", error);
    }
  };
  if (!link) {
    return <></>;
  }
  return (
    <div className=" w-full  caret-transparent pt-1">
      <div className="w-full px-3">
        <div className=" relative w-full">
          <div className="w-full h-10 border-[1px] cborder rounded-lg px-2 flex items-center overflow-hidden mt-4 ">
            <div className="tp whitespace-nowrap  ">
              {link}
            </div>
          </div>
          <div className="absolute right-[1px] top-[1px] h-9  px-2 sbg rounded-lg">
            <div
              onClick={copyToClipboard}
              className=" h-full flex items-center tp hover:text-lightMode-header dark:hover:text-darkMode-header cursor-pointer"
            >
              <AddLinkOutlinedIcon />
            </div>
            {showCopiedMessage && (
              <div className=" absolute top-[-32px] right-2 rounded-full p-1 text-xs bgbtn th animate-fadeInOut">
                Copied
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleShare}
          className=" mt-4 px-2 w-full h-10 bg-lightMode-button dark:bg-lightMode-button text-lightMode-header font-[400] text-sm dark:text-lightMode-header hover:bg-lightMode-buttonHover rounded-lg"
        >
          Share link
        </button>
      </div>
    </div>
  );
}
