import { AddIcon, CloseIcon } from "@/assets/icons";
import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  MouseEvent,
  useState,
} from "react";
import CategoryCheckBox from "./CategoryCheckBox";
import { CATEGORY_LIST } from "@/constants";

interface MapDataType {
  title: string;
  description: string;
  thumbnailUrl: string;
  categories: string[];
}

interface CreateMapDetailsModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
  mapData: MapDataType;
  setMapData: Dispatch<SetStateAction<MapDataType>>;
}

const CreateMapDetailsModal = ({
  onClose,
  mapData,
  setMapData,
}: CreateMapDetailsModalProps) => {
  const [tempMapData, setTempMapData] = useState<MapDataType>(mapData);

  const handleChangeMapData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;

    setTempMapData((prev) => {
      return { ...prev, [target.id]: target.value };
    });
  };

  const handleClickCategory = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    setTempMapData((prev) => {
      return {
        ...prev,
        categories: prev.categories.includes(target.id)
          ? prev.categories.filter((category) => category !== target.id)
          : [...prev.categories, target.id],
      };
    });
  };

  const handleClickDone = () => {
    setMapData(tempMapData);
    onClose(false);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-20 sm:p-2 z-20">
      <div className="relative flex flex-col gap-7 sm:gap-10 w-full h-full overflow-y-scroll sm:h-auto sm:w-auto sm:rounded-xl bg-white px-4 mobile:px-10 md:px-16 py-5 mobile:py-10 md:py-14 z-30">
        <button
          className="absolute top-5 right-4 sm:right-5"
          onClick={() => onClose(false)}
        >
          <CloseIcon className="w-6 h-6 sm:w-10 sm:h-10" />
        </button>
        <h1 className="text-xl font-bold leading-7 sm:text-2xl sm:leading-8">
          Map Details
        </h1>
        <div className="flex flex-col sm:flex-row gap-10 md:gap-16">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-base font-bold leading-5">Thumbnail</h2>
            <label htmlFor="">
              <button className="flex flex-col items-center justify-center w-full h-auto aspect-square sm:w-[265px] sm:h-[265px] gap-2.5 border border-[#CCCCCC] rounded-xl">
                <AddIcon className="w-6 h-6 mobile:w-8 mobile:h-8" />
                <p className="text-base font-bold leading-5">Upload a Image</p>
              </button>
              <input type="file" className="hidden" />
            </label>
          </div>
          <div className="flex flex-col gap-7 w-full sm:max-w-[303px] md:max-w-[500px] justify-between">
            <div className="flex flex-col gap-2.5">
              <h2 className="text-base font-bold leading-5">Map Title</h2>
              <input
                type="text"
                id="title"
                value={tempMapData["title"]}
                onChange={handleChangeMapData}
                className="w-full border border-[#CCCCCC] rounded-lg h-[50px] px-4 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <h2 className="text-base font-bold leading-5">Description</h2>
              <textarea
                id="description"
                value={tempMapData["description"]}
                onChange={handleChangeMapData}
                className="w-full border border-[#CCCCCC] rounded-lg h-[50px] sm:h-36 px-4 py-1 sm:py-4 resize-none focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-base font-bold leading-5">
            Select One or More Categories
          </h2>
          <div className="w-fit grid grid-cols-2 mobile:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-10 gap-y-4">
            {CATEGORY_LIST.map((category) => (
              <CategoryCheckBox
                category={category}
                handleClickCategory={handleClickCategory}
                checked={tempMapData.categories.includes(category)}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleClickDone}
            className="h-[50px] w-full sm:w-fit px-5 bg-[#FFE852] font-semibold text-base leading-5 rounded-full"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMapDetailsModal;
