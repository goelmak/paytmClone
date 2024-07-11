import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Error from "./Error";
import { useRecoilState } from "recoil";
import { accountState } from "../store/atom";
import { fetchAccountDetails } from "../utils/api";

const PaymentModal = ({
  firstName,
  lastName,
  username,
  show,
  onClose,
  onSend,
}: {
  firstName: string;
  lastName?: string;
  username: string;
  show: boolean;
  onClose: () => void;
  onSend: (amount: number) => void;
}) => {
  const [amount, setAmount] = useState<number>(0);

  const [error, setError] = useState<string[]>();

  const [balance, setBalance] = useRecoilState(accountState);
  if (!show) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 h-fit w-fit m-auto flex items-center justify-center z-50">
        <div className="flex flex-col items-center p-3 border rounded-md bg-white">
          <div className="font-medium w-fit m-2 text-center rounded-md text-2xl">{`${firstName} ${lastName}`}</div>
          <div className="font-bold text-center rounded-md text-xl w-fit">{`${username}`}</div>
          <Input
            title="amount"
            placeholder="amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.valueAsNumber);
            }}
            type="number"
          ></Input>
          <Button
            title="send"
            onClick={async () => {
              if (amount > 0 && amount <= balance) {
                await onSend(amount);
                setError([]);
                const fetchBalance = async () => {
                  const token = localStorage.getItem("token") || "";
                  const data = await fetchAccountDetails(token);
                  setBalance(data?.balance);
                };
                fetchBalance();
              } else {
                setError([`you do not have ${amount}`]);
              }
            }}
          ></Button>
          {<Error errors={error}></Error>}
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
