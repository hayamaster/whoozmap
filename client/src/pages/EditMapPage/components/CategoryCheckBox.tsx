import { MouseEvent } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { makeCategoryLabel } from "@/utils";

interface CategoryCheckBoxProps {
  category: string;
  handleClickCategory: (e: MouseEvent<HTMLButtonElement>) => void;
  checked: boolean;
}

const CategoryCheckBox = ({
  category,
  handleClickCategory,
  checked,
}: CategoryCheckBoxProps) => {
  const categoryLabel = makeCategoryLabel(category);

  return (
    <div className="w-fit flex items-center gap-2.5">
      <Checkbox
        onClick={handleClickCategory}
        id={category}
        className="rounded-full border border-[#161616]"
        checked={checked}
      />
      <label
        htmlFor={category}
        className="text-sm font-base leading-5 select-none"
      >
        {categoryLabel}
      </label>
    </div>
  );
};

export default CategoryCheckBox;
