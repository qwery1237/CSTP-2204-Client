import RewardCardDetails from './RewardCardDetails';

export default function RewardCard({
  reward,
  amount,
  point,
  sm,
  md,
  lg,
  isPurchased,
}) {
  const { icon, bg } = reward;
  const price = md ? 25 : amount * 100;
  const isAvailable = point >= price;
  const percent = isAvailable ? 100 : (point / price) * 100;
  const converted = percent.toFixed();

  const cardSizeClass = sm
    ? `w-48 h-36 ${amount ? '' : 'bg-[#182335] '}`
    : `h-[152px] ${isPurchased ? '' : 'cursor-pointer'} ` +
      (md ? 'w-32 bg-[#182335] ' : '') +
      (lg ? 'w-56 ' : '');

  return (
    <>
      <div
        className={'relative p-4 rounded-xl flex flex-col th ' + cardSizeClass}
        style={{ backgroundColor: bg }}
      >
        {isPurchased && (
          <>
            <div className='absolute top-0 left-0 w-full h-full bg-black rounded-xl opacity-50'></div>
            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center th text-sm '>
              Purchased
            </div>
          </>
        )}
        <div
          className={` w-full h-full flex items-center justify-center ${
            sm ? `text-5xl ${amount ? '' : 'scale-150'}` : 'mb-6 mt-2 text-4xl'
          }`}
        >
          {icon || ''}
        </div>
        {(lg || md) && (
          <>
            {lg && (
              <div className=' w-full h-[6px] rounded-full bg-neutral-400 mb-4'>
                <div
                  className='h-full rounded-full bg-white'
                  style={{ width: converted + '%' }}
                ></div>
              </div>
            )}

            <RewardCardDetails
              amount={amount}
              price={price}
              isAvailable={isAvailable}
            />
          </>
        )}
      </div>
    </>
  );
}
