import { useEffect, useState, MouseEvent } from "react";
import { useGetListItems } from "@/apis/hooks";
import { Logo, SearchIcon, SaveIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { likeToThousandsUnit } from "@/utils";
import { LoginModal } from "@/components";

interface ListItem {
  _id: string;
  title: string;
  userName: string;
  imageUrl: string;
  updatedAt: string;
  likeCount: number;
}

const HomePage = () => {
  const { data } = useGetListItems();

  const [search, setSearch] = useState<string>("");
  const [clickedCategory, setClickedCategory] = useState<string>("all");
  const [clickedSort, setClickedSort] = useState<string>("newest");
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  const handleCategoryClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    setClickedCategory(target.id);
  };

  const handleSortClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    setClickedSort(target.id);
  };

  const handleClickLogin = () => {
    setOpenLoginModal(true);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col items-center">
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
          <button className="px-1 py-0.5 shrink-0" onClick={handleClickLogin}>
            Maps
          </button>
          <button className="px-1 py-0.5 shrink-0" onClick={handleClickLogin}>
            About us
          </button>
          <button className="px-1 py-0.5 shrink-0" onClick={handleClickLogin}>
            My Account
          </button>
          <button
            className="bg-[#FFE852] px-3 py-1.5 lg:px-4 lg:py-2 rounded-full font-semibold shrink-0"
            onClick={handleClickLogin}
          >
            Create a Map
          </button>
        </div>
      </header>

      <div className="flex w-full h-full overflow-y-scroll flex-col items-center">
        <div className="w-full flex flex-col justify-center items-center text-3xl lg:text-4xl xl:text-5xl font-bold py-10">
          <h1>Find out people's</h1>
          <h1>favorite places on maps!</h1>
        </div>

        <div className="flex w-full py-4 items-center sticky top-0 bg-white z-10">
          <div className="flex w-full gap-1 items-center justify-start">
            <Button
              onClick={handleCategoryClick}
              id="all"
              variant={`${clickedCategory === "all" ? "default" : "outline"}`}
              className="rounded-full text-xs xl:text-sm font-normal px-3 py-0.5 h-6"
            >
              All
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="eats-drinks"
              variant={`${clickedCategory === "eats-drinks" ? "default" : "outline"}`}
              className="rounded-full text-xs xl:text-sm font-normal px-3 py-0.5 h-6"
            >
              Eats & Drinks
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="dates"
              variant={`${clickedCategory === "dates" ? "default" : "outline"}`}
              className="rounded-full text-xs xl:text-sm font-normal px-3 py-0.5 h-6"
            >
              Dates
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="hangouts"
              variant={`${clickedCategory === "hangouts" ? "default" : "outline"}`}
              className="rounded-full text-xs xl:text-sm font-normal px-3 py-0.5 h-6"
            >
              Hangouts
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="shops"
              variant={`${clickedCategory === "shops" ? "default" : "outline"}`}
              className="rounded-full text-xs xl:text-sm font-normal px-3 py-0.5 h-6"
            >
              Shops
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="adventures"
              variant={`${clickedCategory === "adventures" ? "default" : "outline"}`}
              className="rounded-full text-xs xl:text-sm font-normal px-3 py-0.5 h-6"
            >
              Adventures
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="relaxations"
              variant={`${clickedCategory === "relaxations" ? "default" : "outline"}`}
              className="rounded-full text-xs xl:text-sm font-normal px-3 py-0.5 h-6"
            >
              Relaxations
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="attractions"
              variant={`${clickedCategory === "attractions" ? "default" : "outline"}`}
              className="rounded-full text-xs xl:text-sm font-normal px-3 py-0.5 h-6"
            >
              Attractions
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="celebrations"
              variant={`${clickedCategory === "celebrations" ? "default" : "outline"}`}
              className="rounded-full text-xs xl:text-sm font-normal px-3 py-0.5 h-6"
            >
              Celebrations
            </Button>
            <Button
              onClick={handleCategoryClick}
              id="others"
              variant={`${clickedCategory === "others" ? "default" : "outline"}`}
              className="rounded-full text-xs xl:text-sm font-normal px-3 py-0.5 h-6"
            >
              Others
            </Button>
          </div>
          <div className="flex gap-0.5 items-center w-full justify-end">
            <Button
              onClick={handleSortClick}
              id="newest"
              variant="ghost"
              className={`text-xs xl:text-sm font-normal px-2 py-0.5 h-6 ${clickedSort === "newest" ? "text-black" : "text-gray-400"}`}
            >
              Newest
            </Button>
            <Button
              onClick={handleSortClick}
              id="popular"
              variant="ghost"
              className={`text-xs xl:text-sm font-normal px-2 py-0.5 h-6 ${clickedSort === "popular" ? "text-black" : "text-gray-400"}`}
            >
              Most Popular
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full h-full gap-3 items-center justify-items-center pt-10 pb-4">
          {data &&
            data.map((item: ListItem) => (
              <div
                key={item._id}
                className="rounded-xl w-72 h-[412px] overflow-hidden flex flex-col gap-px"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-72 h-72 object-cover"
                />
                <div className="flex justify-between items-center w-full pt-2.5 pb-1">
                  <h2 className="font-bold text-xl">{item.title}</h2>
                  <SaveIcon className="w-6 h-6" />
                </div>
                <p className="text-[#444444] text-sm">{item.userName}</p>
                <p className="text-[#444444] text-sm">
                  {String(item.updatedAt).split("T")[0]}
                </p>
                <p className="text-[#444444] text-sm">
                  {likeToThousandsUnit(item.likeCount)}
                </p>
              </div>
            ))}
        </div>
      </div>

      {openLoginModal && <LoginModal onClose={setOpenLoginModal} />}
    </div>
  );
};

export default HomePage;
