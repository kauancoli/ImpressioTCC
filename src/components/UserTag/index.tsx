import { UserDTO } from "@/DTOS/PinDTO";

type UserTagProps = {
  user: UserDTO;
};

export const UserTag = ({ user }: UserTagProps) => {
  return (
    <>
      {user ? (
        <div className="flex gap-3 items-center">
          <img
            src={user.image}
            alt="userImage"
            width={45}
            height={45}
            className="rounded-full"
          />
          <div>
            <h2 className="text-sm font-normal text-white">{user.name}</h2>
            <h2 className="text-xs text-white">{user.email}</h2>
          </div>
        </div>
      ) : null}
    </>
  );
};
