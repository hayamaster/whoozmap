import { AddIcon, CloseIcon } from "@/assets/icons";
import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  MouseEvent,
  useState,
  useRef,
} from "react";
import CategoryCheckBox from "./CategoryCheckBox";
import { CATEGORY_LIST } from "@/constants";
import { uploadFile } from "@/utils";
import { Loading } from "@/components";

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
  const uploadPhotoRef = useRef<HTMLInputElement | null>(null);
  const [tempMapData, setTempMapData] = useState<MapDataType>(mapData);
  const [loadingUploadPhoto, setLoadingUploadPhoto] = useState<boolean>(false);
  const [filledTitle, setFilledTitle] = useState<boolean>(true);
  const [filledThumbnail, setFilledThumbnail] = useState<boolean>(true);
  const [filledCategories, setFilledCategories] = useState<boolean>(true);

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

  const handleUploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setLoadingUploadPhoto(true);

    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);

    setTempMapData((prev) => {
      return {
        ...prev,
        thumbnailUrl: uploadPhoto?.url,
      };
    });
    setLoadingUploadPhoto(false);
  };

  const checkAllRequiredFields = () => {
    setFilledThumbnail(tempMapData.thumbnailUrl.trim() !== "");
    setFilledTitle(tempMapData.title.trim() !== "");
    setFilledCategories(tempMapData.categories.length > 0);

    return (
      tempMapData.title.trim() !== "" &&
      tempMapData.thumbnailUrl !== "" &&
      tempMapData.categories.length > 0
    );
  };

  const handleClickDone = () => {
    if (!checkAllRequiredFields()) return;

    setMapData(tempMapData);
    onClose(false);
  };

  return (
    <>
      {loadingUploadPhoto && <Loading size="xl" />}
      <div className="h-dvh w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-20 sm:p-2 z-20">
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
              <label htmlFor="thumbnail_pic">
                <button
                  onClick={() => uploadPhotoRef?.current?.click()}
                  className={`flex flex-col items-center justify-center w-full h-auto aspect-square sm:w-[265px] sm:h-[265px] gap-2.5 border border-[#CCCCCC] rounded-xl ${!filledThumbnail && "border-[#F14739]"}`}
                >
                  {tempMapData.thumbnailUrl ? (
                    <img
                      className="w-full h-full overflow-hidden rounded-xl object-cover"
                      src={tempMapData.thumbnailUrl}
                    />
                  ) : (
                    <>
                      <AddIcon className="w-6 h-6 mobile:w-8 mobile:h-8" />
                      <p className="text-base font-bold leading-5">
                        Upload a Image
                      </p>
                    </>
                  )}
                </button>
                <input
                  type="file"
                  className="hidden"
                  id="thumbnail_pic"
                  ref={uploadPhotoRef}
                  onChange={handleUploadPhoto}
                />
              </label>
              {!filledThumbnail && (
                <p className="text-xs mobile:text-sm text-[#F14739]">
                  Please upload a image
                </p>
              )}
            </div>
            <div className="flex flex-col gap-7 w-full sm:max-w-[303px] md:max-w-[500px] justify-between">
              <div className="flex flex-col gap-2.5">
                <h2 className="text-base font-bold leading-5">Map Title</h2>
                <input
                  type="text"
                  id="title"
                  value={tempMapData["title"]}
                  onChange={handleChangeMapData}
                  className={`w-full border border-[#CCCCCC] rounded-lg h-[50px] px-4 focus:outline-none ${!filledTitle && "border-[#F14739]"}`}
                />
                {!filledTitle && (
                  <p className="text-xs mobile:text-sm text-[#F14739]">
                    Please fill the title
                  </p>
                )}
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
                  key={category}
                  category={category}
                  handleClickCategory={handleClickCategory}
                  checked={tempMapData.categories.includes(category)}
                />
              ))}
            </div>
            {!filledCategories && (
              <p className="text-xs mobile:text-sm text-[#F14739]">
                Please select at least one category or more
              </p>
            )}
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={handleClickDone}
              className={`h-[50px] w-full sm:w-fit px-5 font-semibold text-base leading-5 rounded-full ${
                tempMapData.title.trim() !== "" &&
                tempMapData.thumbnailUrl !== "" &&
                tempMapData.categories.length > 0
                  ? "bg-[#FFE852] hover:bg-[#F2D66B]"
                  : "!bg-[#EDEDED]"
              }`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMapDetailsModal;
