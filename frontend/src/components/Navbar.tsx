import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userSchema } from "../utils/schema";
import { fetchUserDetails } from "../utils/api";
import { userDetailState } from "../store/atom";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const [userDetails, setUserDetails] = useRecoilState(userDetailState);

  useEffect(() => {
    const fetchingUserDetails = async () => {
      const token = localStorage.getItem("token") || "";
      try {
        const fetchedUserDetails = await fetchUserDetails(token);
        const parsedDetails = userSchema
          .pick({ username: true, lastName: true, firstName: true })
          .parse(fetchedUserDetails);
        setUserDetails({ ...parsedDetails, loggedIn: true });
      } catch (err) {
        const msg = (err as Error).message;
        console.error("msg", msg);
      }
    };
    fetchingUserDetails();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="px-3 flex justify-between bg-teal-700">
      <div className="flex flex-col justify-center font-bold text-xl">
        PAYTM
      </div>

      {userDetails.loggedIn ? (
        <div className="flex gap-3 w-2/12">
          <Link
            to="/dashboard"
            className="w-11/12 p-2 bg-gray-900 my-3 font-bold
            font-sans hover:bg-gray-700 text-white text-xl rounded-md"
          >
            Dashboard
          </Link>
          <Button
            onClick={() => {
              localStorage.clear();
              setUserDetails({ username: "", firstName: "", loggedIn: false });
              navigate("/signup");
            }}
            title="log out"
          ></Button>
        </div>
      ) : (
        <div className="flex gap-3 w-2/12">
          <Link
            to="/signup"
            className="w-11/12 p-2 bg-gray-900 my-3 font-bold font-sans hover:bg-gray-700 text-white text-xl rounded-md text-center"
          >
            Sign up
          </Link>
          <Link
            to="/signin"
            className="w-11/12 p-2 bg-gray-900 my-3 font-bold font-sans hover:bg-gray-700 text-white text-xl rounded-md text-center"
          >
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};
export default Navbar;
