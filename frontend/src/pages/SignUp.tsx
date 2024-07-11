import { useRecoilState } from "recoil";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";
import Input from "../components/Input";
import Warning from "../components/Warning";
import { userState } from "../store/atom";
import { userSchema } from "../utils/schema";
import { signUp } from "../utils/api";
import { useState } from "react";
import { ZodError } from "zod";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useRecoilState(userState);
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleOnChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((item) => {
      return { ...item, [id]: value };
    });
    console.log("user", user);
  };

  const handleOnSubmitEvent = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const parsedUser = userSchema.parse(user);
      signUp(parsedUser);
      navigate("/dashboard");
      setUser((item) => ({ ...item, username: "", password: "" }));
    } catch (err) {
      const msg = (err as ZodError).flatten();
      setErrors(msg);
      console.error("msg", msg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-stone-300">
      <Card>
        <Header
          heading="Sign Up"
          desc="Enter your information to create an account"
        ></Header>
        <Input
          title={"First Name"}
          placeholder="John"
          id="firstName"
          type="text"
          onChange={handleOnChangeEvent}
          value={user.firstName}
        ></Input>
        <Error errors={errors?.fieldErrors?.firstName}></Error>
        <Input
          title={"Last Name"}
          placeholder="Doe"
          id="lastName"
          type="text"
          onChange={handleOnChangeEvent}
          value={user.lastName || ""}
        ></Input>
        <Error errors={errors?.fieldErrors?.lastName}></Error>
        <Input
          title={"Email"}
          placeholder="Johndoe@example.com"
          id="username"
          type="email"
          onChange={handleOnChangeEvent}
          value={user.username}
        ></Input>
        <Error errors={errors?.fieldErrors?.username}></Error>
        <Input
          title={"Password"}
          placeholder=""
          id="password"
          type="password"
          onChange={handleOnChangeEvent}
          value={user.password}
        ></Input>
        <Error errors={errors?.fieldErrors?.password}></Error>
        <Button title={"Sign Up"} onClick={handleOnSubmitEvent}></Button>
        <Warning
          warning="Already have an account?"
          linkName="Sign In"
          link="/signin"
        ></Warning>
      </Card>
    </div>
  );
};
export default SignUp;
