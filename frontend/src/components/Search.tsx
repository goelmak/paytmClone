import { useRecoilState } from "recoil";
import { filterState } from "../store/atom";

const Search = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  return (
    <input
      placeholder="Search Users ..."
      className="rounded-md border focus:outline-none p-2"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    ></input>
  );
};
export default Search;
