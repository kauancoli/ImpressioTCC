import { api } from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { setCookie } from "@/utils/cookie";
import { User } from "phosphor-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface EditProfileFormProps {
  setIsEditing: (value: boolean) => void;
}

type FormValues = {
  emailUsuario: string;
  dataNascimento: Date;
  apelido: string;
  nomeUsuario: string;
  biografiaUsuario: string;
  imagemUsuario: string;
  publico: boolean;
};

export const EditProfileForm = ({ setIsEditing }: EditProfileFormProps) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      emailUsuario: user?.emailUsuario || "",
      dataNascimento: user?.dataNascimento || new Date(),
      apelido: user?.apelido || "",
      nomeUsuario: user?.nomeUsuario || "",
      biografiaUsuario: user?.biografiaUsuario || "",
      imagemUsuario: user?.imagemUsuario || "",
      publico: user?.publico || false,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    user?.imagemUsuario || null
  );

  const handleImageChange = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setValue("imagemUsuario", reader.result.toString());
        setImagePreview(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await api.put(`/Usuario`, {
        idUsuario: user?.idUsuario,
        emailUsuario: data.emailUsuario,
        dataNascimento: data.dataNascimento,
        apelido: data.apelido,
        nomeUsuario: data.nomeUsuario,
        biografiaUsuario: data.biografiaUsuario,
        imagemUsuario: data.imagemUsuario,
        publico: data.publico,
      });

      setCookie(
        "imp-user",
        JSON.stringify({
          idUsuario: user?.idUsuario,
          ...data,
          imagemUsuario: "",
        })
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center gap-4 mb-4">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="userImage"
              className="rounded-full w-24 h-24 object-cover shadow-lg"
            />
          ) : (
            <div className="rounded-full w-24 h-24 bg-gray-400 flex justify-center items-center">
              <User size={48} color="white" weight="bold" />
            </div>
          )}
          <div className="mt-2">
            <label
              htmlFor="imagemUsuario"
              className="bg-background text-white font-bold p-2 rounded-md cursor-pointer text-sm"
            >
              Alterar Foto
            </label>
            <input
              id="imagemUsuario"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files &&
                e.target.files[0] &&
                handleImageChange(e.target.files[0])
              }
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="mb-4">
            <label
              htmlFor="nomeUsuario"
              className="block text-sm font-medium text-gray-300"
            >
              Nome
            </label>
            <input
              id="nomeUsuario"
              type="text"
              {...register("nomeUsuario", { required: "Nome é obrigatório" })}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md text-background"
            />
            {errors.nomeUsuario && (
              <span className="text-red-500 text-sm">
                {errors.nomeUsuario.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="apelido"
              className="block text-sm font-medium text-gray-300"
            >
              Apelido
            </label>
            <input
              id="apelido"
              type="text"
              {...register("apelido")}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md text-background"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="emailUsuario"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            id="emailUsuario"
            type="email"
            {...register("emailUsuario", { required: "Email é obrigatório" })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md text-background"
          />
          {errors.emailUsuario && (
            <span className="text-red-500 text-sm">
              {errors.emailUsuario.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="biografiaUsuario"
            className="block text-sm font-medium text-gray-300"
          >
            Biografia
          </label>
          <textarea
            id="biografiaUsuario"
            {...register("biografiaUsuario")}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md text-background"
            rows={4}
          />
        </div>

        <div className="mb-4">
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
              Tornar perfil público
            </span>
          </label>
        </div>

        <div className="flex justify-between items-center gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded-md text-background 
            font-bold w-full"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-background rounded-md 
            font-bold w-full"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};
