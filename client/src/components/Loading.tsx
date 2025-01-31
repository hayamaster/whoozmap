import { Spinner } from "./ui/spinner";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const Loading = ({ size = "sm" }: LoadingProps) => {
  return (
    <div className="w-screen h-dvh flex items-center justify-center bg-gray-700 bg-opacity-10">
      <Spinner size={size} className="bg-black dark:bg-white" />
    </div>
  );
};

export default Loading;
