export type PinImageDTO = {
  image: string;
  title: string;
};

export type UpDownVoteDTO = {
  up: number;
  down: number;
};

export type GetPinsResponseDTO = {
  data: {
    totalDeItens: number;
    itensPorPagina: number;
    paginaAtual: number;
    totalDePaginas: number;
    temPaginaAnterior: boolean;
    registros: PinDetailDTO[];
  };
  messages: [];
  success: boolean;
  token: string | null;
};

export type PinDetailDTO = {
  idObraArte: number;
  imagemObraArte: string;
  descricaoObraArte: string;
  publico: boolean;
  idUsuario: number;
  nomeUsuario: string;
  apelido: string;
  imagemUsuario: string | null;
};
