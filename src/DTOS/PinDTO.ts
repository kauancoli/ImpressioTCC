export type UserDTO = {
  id: number;
  name: string;
  nick: string;
  image: string;
};

export type PinDetailDTO = {
  id: number;
  title: string;
  desc: string;
  user: UserDTO;
  image: PinImageDTO;
  vote: UpDownVoteDTO;
};

export type PinImageDTO = {
  image: string;
  title: string;
};

export type UpDownVoteDTO = {
  up: number;
  down: number;
};
