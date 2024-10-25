import { PinDetailDTO } from "@/DTOS/PinDTO";
import Masonry from "react-masonry-css";
import { PinItem } from "./PinItem";
import "./PinList.css";

type PinListProps = {
  listOfPins: PinDetailDTO[];
};

export const PinList = ({ listOfPins }: PinListProps) => {
  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    700: 3,
    500: 2,
    400: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {listOfPins.map((item) => (
        <PinItem key={`List - ${item.id}`} pin={item} user={item.user} />
      ))}
    </Masonry>
  );
};
