import { useEffect } from "react";
import Appbar from "../components/Appbar";
import { fetchAccountDetails, fetchAllUsers } from "../utils/api";
import Receivers from "../components/Receivers";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accountState, userListState } from "../store/atom";

const Dashboard = () => {
  const [balance, setBalance] = useRecoilState(accountState);
  const setUserList = useSetRecoilState(userListState);

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token") || "";
      const data = await fetchAccountDetails(token);
      setBalance(data?.balance);
    };
    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchList = async () => {
      const token = localStorage.getItem("token") || "";
      const data = await fetchAllUsers(token);
      setUserList(data.users);
    };
    fetchList();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col  w-11/12 gap-y-5 h-[80vh] mx-auto">
        <Appbar></Appbar>
        <div className=" flex px-2 flex-col justify-center font-bold text-xl ">
          {`your balance is ${balance}`}
        </div>
        <Receivers></Receivers>
      </div>
    </div>
  );
};
export default Dashboard;
