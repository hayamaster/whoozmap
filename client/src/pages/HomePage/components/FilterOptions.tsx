import {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { Button } from "@/components/ui/button";

interface FilterOptionsProps {
  clickedCategory: string;
  setClickedCategory: Dispatch<SetStateAction<string>>;
  clickedSort: string;
  setClickedSort: Dispatch<SetStateAction<string>>;
}

const FilterOptions = ({
  clickedCategory,
  setClickedCategory,
  clickedSort,
  setClickedSort,
}: FilterOptionsProps) => {
  const [isCategoryCentered, setIsCategoryCentered] = useState<boolean>(true);
  const categoryContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkWidth = () => {
      if (categoryContainerRef.current) {
        const containerWidth = categoryContainerRef.current.offsetWidth;
        const buttons = Array.from(categoryContainerRef.current.children);
        const buttonsWidth = buttons.reduce(
          (acc, btn) => acc + (btn as HTMLButtonElement).offsetWidth,
          0
        );
        const totalGap = 10 * (buttons.length - 1);

        setIsCategoryCentered(containerWidth > buttonsWidth + totalGap);
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const handleCategoryClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    setClickedCategory(target.id);
  };

  const handleSortClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    setClickedSort(target.id);
  };

  return (
    <div className="flex flex-col w-full gap-10 items-center sticky top-0 bg-white z-10 pt-6">
      <div
        className={`flex w-full gap-2.5 items-center overflow-x-scroll ${isCategoryCentered && "justify-center"}`}
        ref={categoryContainerRef}
      >
        <Button
          onClick={handleCategoryClick}
          id="all"
          variant={`${clickedCategory === "all" ? "default" : "outline"}`}
          className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
        >
          All
        </Button>
        <Button
          onClick={handleCategoryClick}
          id="eats-drinks"
          variant={`${clickedCategory === "eats-drinks" ? "default" : "outline"}`}
          className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
        >
          Eats & Drinks
        </Button>
        <Button
          onClick={handleCategoryClick}
          id="dates"
          variant={`${clickedCategory === "dates" ? "default" : "outline"}`}
          className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
        >
          Dates
        </Button>
        <Button
          onClick={handleCategoryClick}
          id="hangouts"
          variant={`${clickedCategory === "hangouts" ? "default" : "outline"}`}
          className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
        >
          Hangouts
        </Button>
        <Button
          onClick={handleCategoryClick}
          id="shops"
          variant={`${clickedCategory === "shops" ? "default" : "outline"}`}
          className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
        >
          Shops
        </Button>
        <Button
          onClick={handleCategoryClick}
          id="adventures"
          variant={`${clickedCategory === "adventures" ? "default" : "outline"}`}
          className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
        >
          Adventures
        </Button>
        <Button
          onClick={handleCategoryClick}
          id="relaxations"
          variant={`${clickedCategory === "relaxations" ? "default" : "outline"}`}
          className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
        >
          Relaxations
        </Button>
        <Button
          onClick={handleCategoryClick}
          id="attractions"
          variant={`${clickedCategory === "attractions" ? "default" : "outline"}`}
          className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
        >
          Attractions
        </Button>
        <Button
          onClick={handleCategoryClick}
          id="celebrations"
          variant={`${clickedCategory === "celebrations" ? "default" : "outline"}`}
          className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
        >
          Celebrations
        </Button>
        <Button
          onClick={handleCategoryClick}
          id="others"
          variant={`${clickedCategory === "others" ? "default" : "outline"}`}
          className="h-[34px] font-normal px-4 rounded-[10px] text-sm leading-4 md:text-base md:leading-5"
        >
          Others
        </Button>
      </div>
      <div className="flex gap-1 items-center w-full justify-end">
        <Button
          onClick={handleSortClick}
          id="newest"
          variant="ghost"
          className={`text-base leading-5 font-normal py-0 px-3 ${clickedSort === "newest" ? "text-black" : "text-gray-400"}`}
        >
          Newest
        </Button>
        <div className="border-r border-[#EDEDED] h-[12px]" />
        <Button
          onClick={handleSortClick}
          id="popular"
          variant="ghost"
          className={`text-base leading-5 font-normal py-0 px-3 ${clickedSort === "popular" ? "text-black" : "text-gray-400"}`}
        >
          Most Popular
        </Button>
      </div>
    </div>
  );
};

export default FilterOptions;
