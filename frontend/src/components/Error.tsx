const Error = ({ errors }: { errors?: string[] }) => {
  if (!errors?.length) return null;
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-11/12">
      {errors.map((err, id) => (
        <p key={id} className="mb-1 last:mb-0">
          {err}
        </p>
      ))}
    </div>
  );
};

export default Error;
