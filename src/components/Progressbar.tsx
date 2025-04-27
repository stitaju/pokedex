export const Progressbar = ({
  width,
}: {
  width: number;
}) => {
  return (
    <div className="w-full">
      <div
        className={`bg-white h-5 rounded-full`}
        style={{ width: `${width > 100 ? 100 : width}%` }}
      ></div>
    </div>
  );
};
