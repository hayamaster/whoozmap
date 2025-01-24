import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMap } from "@/components";
import { SearchIcon } from "@/assets/icons";
import { useState } from "react";

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <div>Loading...</div>;
    case Status.FAILURE:
      return <div>Failed to load Google Maps</div>;
    case Status.SUCCESS:
      return <GoogleMap />;
  }
};

const CreateMapPage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="grid grid-cols-[30%,1fr] w-full h-full">
      <div className="h-full w-full flex flex-col">
        <div className="flex flex-col h-full w-full pt-10 px-10 gap-10">
          <div className="hidden lg:flex bg-white justify-center h-[50px] w-full px-6 border border-[#CCCCCC] rounded-full overflow-hidden items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none h-full px-1 placeholder:text-[#161616]"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <i className="h-6 w-6 flex justify-center items-center cursor-pointer">
              <SearchIcon className="w-6 h-6" />
            </i>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-[#D9D9D9] rounded-md"></div>
              <div className="flex flex-col gap-1">
                <h1 className="text-base font-bold leading-5">Map Title</h1>
                <p className="text-base leading-5 text-[#777777]">Category</p>
              </div>
            </div>
            <p>This is description</p>
            <button
              className="w-full h-[34px] rounded-2xl bg-[#EDEDED] font-semibold"
              type="button"
            >
              Edit
            </button>
          </div>
          <p className="leading-5 font-bold">0 Places Added</p>
          <div className="w-full h-full md:text-lg lg:text-xl xl:text-2xl text-[#777777] font-bold leading-7 flex flex-col justify-center items-center">
            <p>Add your favorite places and</p>
            <p>create own your map!</p>
          </div>
        </div>

        <div className="h-32 w-full p-10">
          <button className="w-full h-12 bg-[#EDEDED] rounded-2xl font-semibold leading-5">
            Create
          </button>
        </div>
      </div>
      <Wrapper
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        render={render}
      />
    </div>
  );
};

export default CreateMapPage;
