interface ButtonProps {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button
      className="w-11/12 p-2 bg-gray-900 my-3 font-bold font-sans hover:bg-gray-700 text-white text-xl rounded-md"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
