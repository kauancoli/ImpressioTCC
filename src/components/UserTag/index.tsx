import { PinDetailDTO } from "@/DTOS/PinDTO";
import { User } from "phosphor-react";

type UserTagProps = {
  user: Pick<
    PinDetailDTO,
    "idUsuario" | "nomeUsuario" | "apelido" | "imagemUsuario"
  >;
  onClick: () => void;
};

export const UserTag = ({ user, onClick }: UserTagProps) => {
  return (
    <>
      {user ? (
        <div className="flex gap-2 items-center md:p-0 md:gap-3">
          {user.imagemUsuario ? (
            <img
              src={user.imagemUsuario}
              alt="userImage"
              width={45}
              height={45}
              className="rounded-full w-8 h-8 md:w-12 md:h-12"
            />
          ) : (
            <div className="rounded-full w-8 h-8 md:w-12 md:h-12 bg-gray-400 flex justify-center items-center">
              <User size={24} color="white" weight="bold" />
            </div>
          )}

          <div className="flex flex-col">
            <h2 className="text-xs md:text-sm font-normal text-white max-w-[100px] truncate">
              {user.nomeUsuario}
            </h2>
            <h2 className="text-xs text-gray-300 max-w-[100px] truncate">
              {user.apelido}
            </h2>
          </div>
        </div>
      ) : null}
    </>
  );
};
