import { UserDTO } from "@/DTOS/PinDTO";

type UserTagProps = {
  user: UserDTO;
};

export const UserTag = ({ user }: UserTagProps) => {
  return (
    <>
      {user ? (
        <div className="flex gap-2 items-center md:p-0 md:gap-3">
          <img
            src={user.image}
            alt="userImage"
            width={45}
            height={45}
            className="rounded-full w-8 h-8 md:w-12 md:h-12"
          />
          <div className="flex flex-col">
            <h2 className="text-xs md:text-sm font-normal text-white max-w-[100px] truncate">
              {user.name}
            </h2>
            <h2 className="text-xs text-gray-300 max-w-[100px] truncate">
              {user.nick}
            </h2>
          </div>
        </div>
      ) : null}
    </>
  );
};
