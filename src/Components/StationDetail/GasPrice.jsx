import { format } from 'timeago.js';
import PersonIcon from '@mui/icons-material/Person';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function GasPrice({ gasInfo, setShowModal }) {
  return (
    <div className='w-full p-4 max-[630px]:px-2  mt-4'>
      <div className=' flex flex-row justify-between items-center th'>
        {' '}
        <div className='th text-2xl'>Gas prices</div>
        <div onClick={() => setShowModal(true)} className=' cursor-pointer'>
          <EditOutlinedIcon />
        </div>
      </div>
      <ul className='grid w-full grid-cols-4 rounded-lg mt-4 cborder border-[1px] max-[640px]:grid-cols-2'>
        {gasInfo.map((gas) => {
          const { type, price, updatedBy, updatedAt } = gas;

          const borderBtw =
            'cborder ' +
            (type == 'Diesel'
              ? ' max-[640px]:border-t-[1px] '
              : type == 'Mid-grade'
              ? ' min-[641px]:border-r-[1px] '
              : 'border-r-[1px] ' +
                (type == 'Premium' ? 'max-[640px]:border-t-[1px] ' : ''));
          return (
            <li
              key={type}
              className={
                'flex flex-col text-center gap-y-2 px-2 py-4 ' + borderBtw
              }
            >
              <div className='th'>{type}</div>
              <div className=' text-xl th'>${price}</div>
              <div className=' w-full justify-center  tp text-sm flex flex-row gap-x-1 items-center'>
                <PersonIcon sx={{ fontSize: 16 }} /> <div> {updatedBy}</div>
              </div>
              <div className=' text-xs tp'>{updatedAt}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
