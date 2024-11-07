import { PinDetailDTO, UserDTO } from "@/DTOS/PinDTO";
import { Link } from "react-router-dom";
import { UserTag } from "../UserTag";

type PinItemProps = {
  pin: PinDetailDTO;
  user: UserDTO;
};

export const PinItem = ({ pin, user }: PinItemProps) => {
  return (
    <div className="mb-5">
      <Link to={`/pin/${pin.id}`}>
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
            src={pin.image.image}
            alt={pin.image.title}
            width={500}
            height={500}
            className="rounded-3xl 
        cursor-pointer relative z-0"
          />
        </div>
      </Link>

      <h2
        className="font-bold 
        text-sm mb-1 mt-2 text-white lg:text-base"
      >
        {pin.title}
      </h2>
      <UserTag user={user} />
    </div>
  );
};
