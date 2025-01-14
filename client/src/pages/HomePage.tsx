import { useEffect, useState } from "react";
import { useGetListItems } from "@/apis/hooks";
import { Logo, SearchIcon } from "@/assets/icons";

interface ListItem {
  _id: string;
  title: string;
  userName: string;
}

const HomePage = () => {
  const { data } = useGetListItems();

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <header className="w-full h-28 grid grid-cols-[2fr_5fr_5fr] lg:grid-cols-[2fr_3fr_3fr] xl:grid-cols-[1fr_1fr_1fr] gap-2 justify-items-center items-center py-6">
        <i className="w-full flex justify-start items-center">
          <Logo className="w-24 h-8" />
        </i>
        <div className="bg-white flex justify-center h-12 w-full px-3 py-1.5 border border-[#CCCCCC] rounded-full overflow-hidden items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none h-full px-1"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <i className="h-6 w-6 flex justify-center items-center cursor-pointer">
            <SearchIcon className="w-6 h-6" />
          </i>
        </div>
        <div className="flex w-full items-center justify-end gap-1 shrink-0 text-xs lg:text-sm">
          <button className="px-1 py-0.5 shrink-0">Maps</button>
          <button className="px-1 py-0.5 shrink-0">About us</button>
          <button className="px-1 py-0.5 shrink-0">My Account</button>
          <button className="bg-[#FFE852] px-3 py-1.5 lg:px-4 lg:py-2 rounded-full font-semibold shrink-0">
            Create a Map
          </button>
        </div>
      </header>
      <h1>Home?</h1>
      {data &&
        data.map((item: ListItem) => (
          <div key={item._id}>
            <p>{item.title}</p>
            <p>{item.userName}</p>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
