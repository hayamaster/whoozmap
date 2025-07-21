import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SettingIcon, ShareIcon, EditIcon, DeleteIcon } from "@/assets/icons";
import { useIsMobile } from "@/hooks";
import toast from "react-hot-toast";
import { useDeleteMap } from "@/apis/hooks";
import { useNavigate } from "react-router-dom";

interface SettingMenuProps {
  mapId: string;
  userId: string;
}

const SettingMenu = ({ mapId, userId }: SettingMenuProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const { mutate: deleteMapMutate } = useDeleteMap();

  const handleShareClick = () => {
    const shareUrl = `https://whoozmap.com/map/${mapId}`;

    if (isMobile) {
      navigator
        .share({
          title: "Check out this map!",
          url: shareUrl,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          toast.success("Link copied successfully!");
        })
        .catch((error) => {
          console.error("Failed to copy link:", error);
          toast.error("Failed to copy link.");
        });
    }
  };

  const handleDeleteMap = () => {
    deleteMapMutate(
      { mapId, userId },
      {
        onSuccess: () => {
          toast.success("Map deleted successfully.");
          navigate("/");
        },
        onError: (error) => {
          toast.error(`Failed to delete map: ${error.message}`);
        },
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SettingIcon className="w-6 h-6 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex flex-col mobile:gap-0.5 md:gap-1 xl:gap-2 px-1 md:px-1.5 py-1 mobile:py-2 md:py-2.5 xl:py-3.5"
      >
        <DropdownMenuItem
          className="gap-1 mobile:gap-2 xl:gap-2.5 px-1.5 mobile:px-2 md:px-3 xl:px-4"
          onClick={handleShareClick}
        >
          <ShareIcon className="!w-5 !h-5 mobile:!w-6 mobile:!h-6" />
          <span className="text-[#161616] text-sm mobile:text-base">
            Share link
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-1 mobile:gap-2 xl:gap-2.5 px-1.5 mobile:px-2 md:px-3 xl:px-4"
          onClick={() => navigate(`/edit-map/${mapId}`)}
        >
          <EditIcon className="!w-5 !h-5 mobile:!w-6 mobile:!h-6" />
          <span className="text-[#161616] text-sm mobile:text-base">Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-1 mobile:gap-2 xl:gap-2.5 px-1.5 mobile:px-2 md:px-3 xl:px-4"
          onClick={handleDeleteMap}
        >
          <DeleteIcon className="!w-5 !h-5 mobile:!w-6 mobile:!h-6" />
          <span className="text-[#161616] text-sm mobile:text-base">
            Delete
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingMenu;
