import { PinDetailDTO } from "@/DTOS/PinDTO";
import { Link } from "react-router-dom";
import { UserTag } from "../UserTag";

type PinItemProps = {
  pin: PinDetailDTO;
};

export const PinItem = ({ pin }: PinItemProps) => {
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
       "
        >
          <img
            src={pin.imagemObraArte}
            alt={pin.descricaoObraArte}
            width={500}
            height={500}
            className="rounded-3xl 
        cursor-pointer relative z-0"
          />
        </div>
      </Link>

      <div className="mt-2">
        <UserTag user={pin} />
      </div>
    </div>
  );
};
