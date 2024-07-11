import Receiver from "./Receiver";
import Search from "./Search";
import { useRecoilValue } from "recoil";
import { filteredUsersListState } from "../store/atom";

const Receivers = () => {
  const filteredList = useRecoilValue(filteredUsersListState);
  return (
    <>
      <div className="px-2 font-bold text-xl ">Friends</div>
      <Search></Search>
      <div className="flex border rounded-md flex-col gap-y-3 overflow-auto max-h-64 p-2">
        {filteredList.map((item, id) => (
          <Receiver
            key={id}
            firstName={item.firstName}
            lastName={item?.lastName}
            username={item.username}
          ></Receiver>
        ))}
      </div>
    </>
  );
};
export default Receivers;
