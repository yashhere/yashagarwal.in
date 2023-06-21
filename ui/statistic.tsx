import { LoadingDots } from "./loading";

export const Statistic = ({
  value,
  label,
  isLoading,
}: {
  value?: number;
  label?: string;
  isLoading?: boolean;
}) => {
  return (
    <div className="bg-black/10 flex flex-col w-full items-center justify-center px-2 py-5 rounded-md">
      {isLoading ? (
        <LoadingDots />
      ) : (
        <p className="text-4xl font-semibold">{value}</p>
      )}
      <p className="font-medium">{label}</p>
    </div>
  );
};
