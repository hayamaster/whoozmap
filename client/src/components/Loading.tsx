import { Spinner } from "./ui/spinner";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const Loading = ({ size = "sm" }: LoadingProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-dvh flex items-center justify-center bg-gray-700 bg-opacity-30 z-50">
      <Spinner size={size} className="bg-black dark:bg-white" />
    </div>
  );
};

export default Loading;
