const Loading = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 sm:p-2 z-20 flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FFA500]">
        Loading
      </div>
    </div>
  );
};

export default Loading;
