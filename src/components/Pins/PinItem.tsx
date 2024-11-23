import { PinDetailDTO } from "@/DTOS/PinDTO";
import { Link } from "react-router-dom";
import { UserTag } from "../UserTag";
import { Trash } from "phosphor-react";

type PinItemProps = {
  pin: PinDetailDTO;
  showUser?: boolean;
  removePin?: (id: number) => void;
  remove?: boolean;
};

export const PinItem = ({
  pin,
  showUser = true,
  removePin,
  remove,
}: PinItemProps) => {
  return (
    <div className="mb-5 relative">
      {removePin && remove && (
        <button
          onClick={() => removePin(pin.idObraArte)}
          className="p-1 rounded-full absolute top-1 left-0 z-20"
        >
          <Trash size={24} weight="bold" color="red" />
        </button>
      )}

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
