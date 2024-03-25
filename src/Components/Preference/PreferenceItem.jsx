import { useEffect, useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

export default function PreferenceItem({
  title,
  options,
  itemIndex,
  setCrrPopUp,
  crrPref,
  setCrrPref,
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!itemIndex) {
      return;
    }
    if (itemIndex == 3) {
      if (crrPref[itemIndex].includes(true)) {
        setIsActive(true);
        return;
      }
      setIsActive(false);
      return;
    }
    setIsActive(crrPref[itemIndex]);
  }, [crrPref]);
  const handlePopUp = () => {
    if (!options) {
      setIsActive(!isActive);
      setCrrPref((prev) => {
        return prev.map((pref, i) => (i ? pref : !pref));
      });
      return;
    }
    setCrrPopUp(itemIndex);
  };
  return (
    <button
      type='button'
      onClick={handlePopUp}
      className={`w-[90px] ${
        !options && 'w-[150px]'
      } ${title === "Recently updated" ? "w-[120px] min-w-[120px]" : "w-[90px] min-w-[90px]"}  h-[40px] mb-4 flex justify-between items-center th text-xs ${
        isActive ? 'bgbtn' : 'sbg'
      } px-3 py-1 rounded-lg`}
    >
      {title}
      {options && <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 16 }} />}
    </button>
  );
}
