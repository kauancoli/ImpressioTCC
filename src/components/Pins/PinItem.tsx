import { PinDetailDTO } from "@/DTOS/PinDTO";
import { Link } from "react-router-dom";
import { UserTag } from "../UserTag";

type PinItemProps = {
  pin: PinDetailDTO;
  onClick: () => void;
};

export const PinItem = ({ pin, onClick }: PinItemProps) => {
  const user: Pick<
    PinDetailDTO,
    "idUsuario" | "nomeUsuario" | "apelido" | "imagemUsuario"
  > = {
    idUsuario: pin.idUsuario,
    nomeUsuario: pin.nomeUsuario,
    apelido: pin.apelido,
    imagemUsuario: pin.imagemUsuario,
  };

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

      <h2
        className="font-bold 
        text-sm mb-1 mt-2 text-white lg:text-base"
      >
        {pin.descricaoObraArte}
      </h2>
      <UserTag user={user} onClick={onClick} />
    </div>
  );
};
