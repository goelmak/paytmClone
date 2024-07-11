import { atom, selector } from "recoil";

interface IUser {
  firstName: string;
  lastName?: string;
  password: string;
  username: string;
}
const userState = atom<IUser>({
  key: "userState",
  default: {
    firstName: "",
    username: "",
    password: "",
  },
});
const userDetailState = atom<{
  loggedIn: boolean;
  username: string;
  firstName: string;
  lastName?: string;
}>({
  key: "userDetailState",
  default: {
    username: "",
    loggedIn: false,
    firstName: "",
  },
});

const userListState = atom<
  {
    username: string;
    firstName: string;
    lastName?: string;
  }[]
>({ key: "userList", default: [] });

const filterState = atom<string>({
  key: "filter",
  default: "",
});

const filteredUsersListState = selector({
  key: "FilteredUsersList",
  get: ({ get }) => {
    const filter = get(filterState);
    const list = get(userListState);

    if (filter.length === 0) {
      return list;
    } else {
      return list.filter((item) => item.firstName.startsWith(filter));
    }
  },
});

const accountState = atom<number>({
  key: "balance",
  default: 0,
});
export {
  userState,
  userDetailState,
  filterState,
  userListState,
  filteredUsersListState,
  accountState,
};
