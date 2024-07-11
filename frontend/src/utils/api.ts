import axios from "axios";

const signUp = async ({
  username,
  firstName,
  lastName,
  password,
}: {
  username: string;
  firstName: string;
  lastName?: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        username,
        firstName,
        lastName,
        password,
      }
    );
    if (response.status >= 200 && response.status <= 300) {
      const token = response.data.token;
      localStorage.setItem("token", token);
    } else {
      throw new Error(`Failed to sign in - ${response.status}`);
    }
  } catch (err) {
    const msg = (err as Error).message;
    console.error("msg", msg);
  }
};

const signIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      {
        username,
        password,
      }
    );
    if (response.status >= 200 && response.status < 300) {
      const token = response.data.token;
      localStorage.setItem("token", token);
    } else {
      throw new Error(`Failed to sign up - ${response.status}`);
    }
  } catch (err) {
    const msg = (err as Error).message;
    console.error("msg", msg);
  }
};

const fetchUserDetails = async (token: string) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/userDetails",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (response.status >= 200 && response.status <= 300) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch use Details - ${response.status}`);
    }
  } catch (err) {
    const msg = (err as Error).message;
    console.error("msg", msg);
    throw err;
  }
};

const fetchAccountDetails = async (token: string) => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/account", {
      headers: {
        Authorization: token,
      },
    });
    if (response.status >= 200 && response.status <= 300) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch use Details - ${response.status}`);
    }
  } catch (err) {
    const msg = (err as Error).message;
    console.error("msg", msg);
  }
};

const fetchAllUsers = async (token: string) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/users",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (response.status >= 200 && response.status <= 300) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch users - ${response.status}`);
    }
  } catch (err) {
    const msg = (err as Error).message;
    console.error("msg", msg);
  }
};

const sendMoney = async (username: string, amount: number, token: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      { to: username, balance: amount },
      {
        headers: { Authorization: token },
      }
    );
    if (response.status >= 200 && response.status <= 300) {
      return response.data;
    } else {
      throw new Error(`Failed to transfer money - ${response.status}`);
    }
  } catch (err) {
    const msg = (err as Error).message;
    console.error("msg", msg);
  }
};

export {
  signUp,
  signIn,
  fetchUserDetails,
  fetchAccountDetails,
  fetchAllUsers,
  sendMoney,
};
