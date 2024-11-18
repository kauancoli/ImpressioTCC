export type UserDTO = {
  idUsuario: number;
  emailUsuario: string;
  dataNascimento: string;
  apelido: string;
  nomeUsuario: string;
  biografiaUsuario: null;
  imagemUsuario: string | null;
  publico: boolean;
};

export type GetUsersResponseDTO = {
  data: UserDTO;
  messages: [];
  success: boolean;
  token: string | null;
};
