import { AddIcon, CloseIcon } from "@/assets/icons";
import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CreateMapDetailsModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
}

const CreateMapDetailsModal = ({ onClose }: CreateMapDetailsModalProps) => {
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-20 sm:p-2 z-20">
      <div className="relative flex flex-col gap-10 rounded-xl bg-white px-16 py-14 z-30">
        <button
          className="absolute top-5 right-5"
          onClick={() => onClose(false)}
        >
          <CloseIcon className="w-10 h-10" />
        </button>
        <h1 className="text-2xl font-bold leading-8">Map Details</h1>
        <div className="grid grid-cols-[3fr,5fr] gap-16">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-base font-bold leading-5">Thumbnail</h2>
            <label htmlFor="">
              <button className="flex flex-col items-center justify-center w-[265px] h-[265px] gap-2.5 border border-[#CCCCCC] rounded-xl">
                <AddIcon className="w-8 h-8" />
                <p className="text-base font-bold leading-5">Upload a Image</p>
              </button>
              <input type="file" className="hidden" />
            </label>
          </div>
          <div className="flex flex-col w-[500px] justify-between">
            <div className="flex flex-col gap-2.5">
              <h2 className="text-base font-bold leading-5">Map Title</h2>
              <input
                type="text"
                className="w-full border border-[#CCCCCC] rounded-lg h-[50px] px-4 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <h2 className="text-base font-bold leading-5">Description</h2>
              <textarea className="w-full border border-[#CCCCCC] rounded-lg h-36 px-4 py-4 focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[500px] gap-4">
          <h2 className="text-base font-bold leading-5">Select Category</h2>
          <div className="w-full grid grid-cols-3 gap-x-10 gap-y-4">
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
          <button className="h-[50px] w-fit px-5 bg-[#FFE852] font-semibold text-base leading-5 rounded-full">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMapDetailsModal;
