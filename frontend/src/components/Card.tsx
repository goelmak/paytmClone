import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-1/5 items-center p-3 border rounded-md bg-white">
      {children}
    </div>
  );
};
export default Card;
