const Input = ({
  title,
  placeholder,
  value,
  onChange,
  type,
  id,
}: {
  id?: string;
  title: string;
  placeholder: string;
  value: string | number;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col w-full items-center my-2">
      <div className="mb-1 font-bold w-11/12 flex flex-start">{title}</div>
      <input
        id={id}
        className="border focus:outline-none w-11/12 rounded font-medium"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
      ></input>
    </div>
  );
};
export default Input;
