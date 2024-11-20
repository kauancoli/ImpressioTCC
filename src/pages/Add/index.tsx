import { UploadImage } from "@/components/UploadImage";
import React, { useState } from "react";

export const AddImagePage: React.FC = () => {
  const [imagemBase64, setImagemBase64] = useState<string | null>(null);
  const [descricao, setDescricao] = useState("");
  const [publico, setPublico] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagemBase64) {
      alert("Por favor, envie uma imagem.");
      return;
    }

    const data = {
      imagemObraArte: imagemBase64,
      descricaoObraArte: descricao,
      publico,
    };

    // Enviar para a API
    // Exemplo:
    // api.post("/endpoint", data);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-background">
      <h1 className="text-2xl font-bold text-gray-200 mb-6">
        Adicionar Imagem
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl bg-gray-800 shadow-md rounded-lg p-6"
      >
        <div className="flex flex-col">
          <label className="block text-gray-200 font-medium mb-4">
            Upload de Imagem
          </label>
          <UploadImage setBase64={setImagemBase64} />
        </div>

        <div className="flex flex-col justify-between">
          <div className="mt-8">
            <div>
              <label
                htmlFor="descricaoObraArte"
                className="block text-gray-200 font-medium mb-2"
              >
                Descrição
              </label>
              <textarea
                id="descricaoObraArte"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={5}
                placeholder="Descreva a obra de arte"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-1 mt-2">
                Visibilidade
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-gray-200">
                  <input
                    type="radio"
                    name="publico"
                    value="true"
                    checked={publico === true}
                    onChange={() => setPublico(true)}
                    className="mr-2"
                  />
                  Público
                </label>
                <label className="flex items-center text-gray-200">
                  <input
                    type="radio"
                    name="publico"
                    value="false"
                    checked={publico === false}
                    onChange={() => setPublico(false)}
                    className="mr-2"
                  />
                  Privado
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-background py-3 rounded-lg hover:bg-primary-dark transition font-medium"
          >
            Adicionar Imagem
          </button>
        </div>
      </form>
    </div>
  );
};
