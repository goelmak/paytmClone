import { useRecoilValue } from "recoil";
import { userDetailState } from "../store/atom";

const Appbar = () => {
  const userDetails = useRecoilValue(userDetailState);
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4 font-bold text-xl">
        Payment App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4 font-bold">
          {`Hello, ${userDetails.firstName} ${userDetails.lastName}`}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {userDetails.firstName.charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Appbar;
