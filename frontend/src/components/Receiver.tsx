import { useState } from "react";
import PaymentModal from "./PaymentModal";
import { sendMoney } from "../utils/api";

const Receiver = ({
  firstName,
  lastName,
  username,
}: {
  firstName: string;
  lastName?: string;
  username: string;
}) => {
  const [showPayment, setShowPayment] = useState(false);

  const handleOpenPaymentModal = () => {
    setShowPayment(true);
  };

  const handleClosePaymentModal = () => {
    setShowPayment(false);
  };

  const handleSendMoney = async (amount: number) => {
    await sendMoney(username, amount, localStorage.getItem("token") || "");
    setShowPayment(false);
  };
  return (
    <>
      <PaymentModal
        show={showPayment}
        firstName={firstName}
        lastName={lastName}
        username={username}
        onClose={handleClosePaymentModal}
        onSend={handleSendMoney}
      ></PaymentModal>
      <div className="flex justify-between">
        <div className="text-center font-bold text-xl">{`${firstName} ${lastName}`}</div>
        <button
          className="bg-gray-900 rounded-md text-white hover:bg-gray-700 p-1"
          onClick={handleOpenPaymentModal}
        >
          Send Money
        </button>
      </div>
    </>
  );
};
export default Receiver;
