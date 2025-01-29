import { AddIcon, CloseIcon } from "@/assets/icons";
import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CreateMapDetailsModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
}

const CreateMapDetailsModal = ({ onClose }: CreateMapDetailsModalProps) => {
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
                className="w-full border border-[#CCCCCC] rounded-lg h-[50px] px-4 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <h2 className="text-base font-bold leading-5">Description</h2>
              <textarea className="w-full border border-[#CCCCCC] rounded-lg h-[50px] sm:h-36 px-4 py-1 sm:py-4 resize-none focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-base font-bold leading-5">
            Select One or More Categories
          </h2>
          <div className="w-fit grid grid-cols-2 mobile:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-10 gap-y-4">
            <div className="w-fit flex items-center gap-2.5">
              <Checkbox
                id="eats-drinks"
                className="rounded-full border border-[#161616]"
              />
              <label
                htmlFor="eats-drinks"
                className="text-sm font-base leading-5 select-none"
              >
                Eats & Drinks
              </label>
            </div>
            <div className="flex items-center gap-2.5">
              <Checkbox
                id="dates"
                className="rounded-full border border-[#161616]"
              />
              <label
                htmlFor="dates"
                className="text-sm font-base leading-5 select-none"
              >
                Dates
              </label>
            </div>
            <div className="flex items-center gap-2.5">
              <Checkbox
                id="adventures"
                className="rounded-full border border-[#161616]"
              />
              <label
                htmlFor="adventures"
                className="text-sm font-base leading-5 select-none"
              >
                Adventures
              </label>
            </div>
            <div className="flex items-center gap-2.5">
              <Checkbox
                id="shops"
                className="rounded-full border border-[#161616]"
              />
              <label
                htmlFor="shops"
                className="text-sm font-base leading-5 select-none"
              >
                Shops
              </label>
            </div>
            <div className="flex items-center gap-2.5">
              <Checkbox
                id="hangouts"
                className="rounded-full border border-[#161616]"
              />
              <label
                htmlFor="hangouts"
                className="text-sm font-base leading-5 select-none"
              >
                Hangouts
              </label>
            </div>
            <div className="flex items-center gap-2.5">
              <Checkbox
                id="relaxations"
                className="rounded-full border border-[#161616]"
              />
              <label
                htmlFor="relaxations"
                className="text-sm font-base leading-5 select-none"
              >
                Relaxations
              </label>
            </div>
            <div className="flex items-center gap-2.5">
              <Checkbox
                id="attractions"
                className="rounded-full border border-[#161616]"
              />
              <label
                htmlFor="attractions"
                className="text-sm font-base leading-5 select-none"
              >
                Attractions
              </label>
            </div>
            <div className="flex items-center gap-2.5">
              <Checkbox
                id="celebrations"
                className="rounded-full border border-[#161616]"
              />
              <label
                htmlFor="celebrations"
                className="text-sm font-base leading-5 select-none"
              >
                Celebrations
              </label>
            </div>
            <div className="flex items-center gap-2.5">
              <Checkbox
                id="others"
                className="rounded-full border border-[#161616]"
              />
              <label
                htmlFor="others"
                className="text-sm font-base leading-5 select-none"
              >
                Others
              </label>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button className="h-[50px] w-full sm:w-fit px-5 bg-[#FFE852] font-semibold text-base leading-5 rounded-full">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMapDetailsModal;
