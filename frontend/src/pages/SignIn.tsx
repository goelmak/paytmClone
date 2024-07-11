import { useRecoilState } from "recoil";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";
import Input from "../components/Input";
import Warning from "../components/Warning";
import { userState } from "../store/atom";
import { userSchema } from "../utils/schema";
import { signIn } from "../utils/api";
import { useState } from "react";
import { ZodError } from "zod";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [user, setUser] = useRecoilState(userState);
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleOnChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((item) => {
      return { ...item, [id]: value };
    });
  };

  const handleOnSubmitEvent = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setErrors("");
    try {
      const parsedUser = userSchema
        .pick({ username: true, password: true })
        .parse(user);
      await signIn(parsedUser);
      navigate("/dashboard");
      setUser((item) => ({ ...item, username: "", password: "" }));
    } catch (err) {
      const msg = (err as ZodError).flatten();
      setErrors(msg);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-stone-300">
      <Card>
        <Header
          heading={"Sign In"}
          desc="Enter Your Credential to access your account"
        ></Header>
        <Input
          id="username"
          title="Email"
          placeholder="johndoe@example.com"
          type="email"
          value={user.username}
          onChange={handleOnChangeEvent}
        ></Input>
        <Error errors={errors?.fieldErrors?.username}></Error>
        <Input
          id="password"
          title="Password"
          placeholder=""
          type="password"
          value={user.password}
          onChange={handleOnChangeEvent}
        ></Input>
        <Error errors={errors?.fieldErrors?.password}></Error>
        <Button title="Sign In" onClick={handleOnSubmitEvent}></Button>
        <Warning
          warning="Don't have an account?"
          linkName="Sign Up"
          link="/signup"
        ></Warning>
      </Card>
    </div>
  );
};
export default SignIn;
