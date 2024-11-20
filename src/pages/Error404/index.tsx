import { Warning } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";

export const Error404: React.FC = () => {
  return (
    <div className="flex flex-col h-3/4 items-center justify-center p-6 bg-background gap-6">
      <Warning size={96} color="#f6e05e" />

      <h1 className="text-4xl font-bold text-white">
        404 - Página não encontrada 🙁
      </h1>

      <Link to="/" className="text-primary text-xl font-bold">
        Clique aqui para voltar para a página inicial
      </Link>
    </div>
  );
};
