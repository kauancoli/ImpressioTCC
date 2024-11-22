import { api } from "@/api/axios";
import { UploadImage } from "@/components/UploadImage";
import { useAuth } from "@/context/AuthContext";
import { GetUsersResponseDTO } from "@/DTOS/UserDTO";
import { CircleNotch } from "phosphor-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  imagemObraArte: string | null;
  descricaoObraArte: string;
  publico: boolean;
};

export const AddImagePage: React.FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      imagemObraArte: null,
      descricaoObraArte: "",
      publico: true,
    },
  });
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const response = await api.post<GetUsersResponseDTO>("/ObraArte", {
        descricaoObraArte: data.descricaoObraArte,
        imagemObraArte: data.imagemObraArte,
        publico: data.publico,
        idUsuario: user?.idUsuario,
        idObraArte: 0,
      });

      if (response.success) {
        reset();
        setMessage(response.messages[0] || "Imagem adicionada com sucesso");
      }

      console.log("Response", response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao adicionar imagem", error);
      setError("imagemObraArte", {
        type: "manual",
        message: "Erro ao adicionar imagem",
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-background">
      <h1 className="text-2xl font-bold text-gray-200 mb-6">
        Adicionar Imagem
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          <div className="flex flex-col">
            <label className="block text-gray-200 font-medium mb-4">
              Upload de Imagem
            </label>
            <Controller
              name="imagemObraArte"
              control={control}
              render={({ field }) => (
                <UploadImage setBase64={(base64) => field.onChange(base64)} />
              )}
              rules={{ required: "Imagem é obrigatória" }}
            />
            {errors.imagemObraArte && (
              <p className="text-red-500 mt-2">
                {errors.imagemObraArte.message}
              </p>
            )}
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
                  {...register("descricaoObraArte", {
                    required: "Descrição é obrigatória",
                  })}
                  id="descricaoObraArte"
                  rows={5}
                  placeholder="Descreva a obra de arte"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
                {errors.descricaoObraArte && (
                  <p className="text-red-500 mt-2">
                    {errors.descricaoObraArte.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="publico"
                  className="inline-flex items-center select-none"
                >
                  <input
                    id="publico"
                    type="checkbox"
                    {...register("publico")}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    Tornar arte pública
                  </span>
                </label>
              </div>
            </div>

            {message && (
              <p className="text-green-500 mt-4 text-center">{message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-background py-3 rounded-lg hover:bg-primary-dark transition font-medium"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <CircleNotch
                    className="animate-spin text-background"
                    size={24}
                  />
                </div>
              ) : (
                "Adicionar Imagem"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
