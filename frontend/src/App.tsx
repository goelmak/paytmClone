import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { fetchUserDetails } from "./utils/api";
import { userState } from "./store/atom";
import { userSchema } from "./utils/schema";
import Navbar from "./components/Navbar";

const App = () => {
  // const navigate = useNavigate();
  // const setUserState = useSetRecoilState(userState);

  // useEffect(() => {
  //   const fetchingUserDetails = async () => {
  //     const token = localStorage.getItem("token") || "";
  //     try {
  //       const fetchedUserDetails = await fetchUserDetails(token);
  //       userSchema.parse(fetchUserDetails);
  //       setUserState(fetchedUserDetails);
  //       navigate("/dashboard");
  //     } catch (err) {
  //       const msg = (err as Error).message;
  //       console.error("msg", msg);
  //       navigate("/signup");
  //     }
  // //   };
  //   fetchingUserDetails();
  // });

  return (
    <RecoilRoot>
      <Navbar></Navbar>
      <Outlet />
    </RecoilRoot>
  );
};
export default App;
