export type GetFavoriteResponseDTO = {
  data: {
    totalDeItens: number;
    itensPorPagina: number;
    paginaAtual: number;
    totalDePaginas: number;
    temPaginaAnterior: boolean;
    registros: FavoriteDTO[];
  };
  messages: [];
  success: boolean;
  token: string | null;
};

export type FavoriteDTO = {
  idObraFavoritada: number;
  idObraArte: number;
  imagemObraArte: string;
  descricaoObraArte: string;
  idUsuario: number;
  nomeUsuario: string;
  apelido: string;
  imagemUsuario: string | null;
};
