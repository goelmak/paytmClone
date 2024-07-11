import { Link } from "react-router-dom";

const Warning = ({
  warning,
  linkName,
  link,
}: {
  warning: string;
  linkName: string;
  link: string;
}) => {
  return (
    <div className="flex items-center justify-center w-11/12 my-1">
      <span className="mr-1">{warning}</span>
      <Link to={link}>{linkName}</Link>
    </div>
  );
};
export default Warning;
