const Header = ({ heading, desc }: { heading: string; desc: string }) => {
  return (
    <div className="flex flex-col items-center p-1 my-1">
      <div className="font-bold text-3xl m-2">{heading}</div>
      <div className="text-center text-zinc-400">{desc}</div>
    </div>
  );
};
export default Header;
