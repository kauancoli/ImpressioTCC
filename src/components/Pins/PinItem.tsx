import { PinDetailDTO } from "@/DTOS/PinDTO";
import { Link } from "react-router-dom";
import { UserTag } from "../UserTag";

type PinItemProps = {
  pin: PinDetailDTO;
  showUser?: boolean;
};

export const PinItem = ({ pin, showUser = true }: PinItemProps) => {
  return (
    <div className="mb-5">
      <Link to={`/pin/${pin.idObraArte}`}>
        <div
          className="relative 
            before:absolute
            before:h-full before:w-full
            before:rounded-3xl
            before:z-10
            hover:before:bg-background 
            before:opacity-50
            cursor-pointer
            transition-opacity
            duration-300
            hover:opacity-85
            "
        >
          <img
            src={pin.imagemObraArte}
            alt={pin.descricaoObraArte}
            width={500}
            height={500}
            className="rounded-3xl cursor-pointer relative z-0"
          />
        </div>
      </Link>

      {showUser && (
        <div className="mt-2">
          <UserTag userTag={pin} />
        </div>
      )}
    </div>
  );
};
