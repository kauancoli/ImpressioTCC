import { useAuth } from "@/context/AuthContext";
import { PinDetailDTO } from "@/DTOS/PinDTO";
import { User } from "phosphor-react";
import { Link } from "react-router-dom";

type UserTagProps = {
  userTag: Pick<
    PinDetailDTO,
    "idUsuario" | "nomeUsuario" | "apelido" | "imagemUsuario"
  >;
};

export const UserTag = ({ userTag }: UserTagProps) => {
  const { user } = useAuth();

  const isUser = user?.idUsuario === userTag.idUsuario;

  return (
    <Link to={isUser ? "/profile" : `/user/${userTag.apelido}`}>
      {userTag ? (
        <div className="flex gap-2 items-center md:p-0 md:gap-3">
          {userTag.imagemUsuario ? (
            <img
              src={userTag.imagemUsuario}
              alt="userImage"
              width={45}
              height={45}
              className="rounded-full w-8 h-8 md:w-12 md:h-12 cursor-pointer"
            />
          ) : (
            <div className="rounded-full w-8 h-8 md:w-12 md:h-12 bg-gray-400 flex justify-center items-center">
              <User size={24} color="white" weight="bold" />
            </div>
          )}

          <div className="flex flex-col">
            <h2 className="text-xs md:text-sm font-normal text-white max-w-[100px] truncate">
              {userTag.nomeUsuario}
            </h2>
            <h2 className="text-xs text-gray-300 max-w-[100px] truncate">
              {userTag.apelido}
            </h2>
          </div>
        </div>
      ) : null}
    </Link>
  );
};
