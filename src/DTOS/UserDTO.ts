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
  data: {
    totalDeItens: number;
    itensPorPagina: number;
    paginaAtual: number;
    totalDePaginas: number;
    temPaginaAnterior: boolean;
    registros: UserDTO[];
  };
  messages: [];
  success: boolean;
  token: string | null;
};

export type GetUserByIdResponseDTO = {
  data: UserDTO;
  messages: [];
  success: boolean;
  token: string | null;
  dados: LoggedUserDTO | null;
};

export type GetLoginResponseDTO = {
  success: boolean;
  messages: string[];
  dados: LoggedUserDTO;
  token: string;
};

export type LoggedUserDTO = {
  idUsuario: number;
  emailUsuario: string;
  nomeUsuario: string;
};
