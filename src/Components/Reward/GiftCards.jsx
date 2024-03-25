import RewardCard from "./RewardCard";

export default function GiftCards({ options, point, setModal, setShowModal }) {
  const {
    giftCard,
    giftCard: { title, icon, bg },
    options: amounts,
  } = options;
  const openModal = (amount, price) => {
    setModal({
      card: <RewardCard reward={giftCard} amount={amount} sm />,
      title,
      amount,
      type: "giftcard",
      price: amount * 100,
    });
    setShowModal(true);
  };
  return (
    <li>
      <h4 className="th text-md my-8">{title}</h4>
      <ul className="flex w-full overflow-auto snap-x ">
        {amounts.map(({ amount, price }) => (
          <li
            key={title + amount}
            onClick={() => openModal(amount, price)}
            className=" mr-3 snap-center h-40"
          >
            <RewardCard reward={giftCard} point={point} amount={amount} lg />
          </li>
        ))}
      </ul>
    </li>
  );
}
