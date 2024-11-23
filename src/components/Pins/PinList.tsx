import { PinDetailDTO } from "@/DTOS/PinDTO";
import Masonry from "react-masonry-css";
import { SkeletonItem } from "../Skeleton";
import { PinItem } from "./PinItem";
import "./PinList.css";

type PinListProps = {
  listOfPins: PinDetailDTO[];
  loading: boolean;
  showUser?: boolean;
  removePin?: (id: number) => void;
  remove?: boolean;
};

export const PinList = ({
  listOfPins,
  loading,
  showUser = true,
  removePin,
  remove,
}: PinListProps) => {
  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    700: 3,
    500: 2,
    400: 2,
  };

  if (loading || listOfPins.length === 0) {
    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonItem key={`Skeleton - ${index}`} />
        ))}
      </Masonry>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {listOfPins.map((item) => (
        <PinItem
          key={`List - ${item.idObraArte}`}
          pin={item}
          showUser={showUser}
          removePin={removePin}
          remove={remove}
        />
      ))}
    </Masonry>
  );
};
