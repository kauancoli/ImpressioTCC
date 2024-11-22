import { useAuth } from "@/context/AuthContext";
import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface RegisterFormData {
  emailUsuario: string;
  senha: string;
  dataNascimento: Date;
  confirmarSenha: string;
  nomeUsuario: string;
  apelido: string;
}

export function RegisterForm() {
  const { register } = useAuth();
  const [isVisibility, setIsVisibility] = useState<boolean>(false);
  const [isConfirmPasswordVisibility, setIsConfirmPasswordVisibility] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      emailUsuario: "",
      senha: "",
      dataNascimento: new Date(),
      confirmarSenha: "",
      apelido: "",
      nomeUsuario: "",
    },
  });

  const onSubmit = async (registerData: RegisterFormData) => {
    if (registerData.senha !== registerData.confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await register(
        registerData.emailUsuario,
        registerData.senha,
        registerData.dataNascimento.toISOString(),
        registerData.apelido,
        registerData.nomeUsuario
      );

      navigate("/login");
      setError(null);
    } catch (error: any) {
      setError(error.response?.data?.message || "Erro ao registrar");
      console.error(error);
    }
  };

  const handlePasswordVisibility = () => {
    setIsVisibility(!isVisibility);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisibility(!isConfirmPasswordVisibility);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-lg shadow-2xl border border-primary mt-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Crie sua conta no{" "}
        <span className="text-primary">
          Impress<span className="text-white">.</span>io
        </span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="emailUsuario"
          control={control}
          render={({ field }) => (
            <div>
              <label
                htmlFor="emailUsuario"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                {...field}
                type="email"
                placeholder="Digite seu email"
                {...formRegister("emailUsuario", {
                  required: "Campo obrigatório",
                })}
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
        />

        <div className="flex gap-5">
          <Controller
            name="nomeUsuario"
            control={control}
            render={({ field }) => (
              <div>
                <label
                  htmlFor="nomeUsuario"
                  className="block text-sm font-medium text-white"
                >
                  Nome de usuário
                </label>
                <input
                  {...field}
                  placeholder="Digite seu nome"
                  {...formRegister("nomeUsuario", {
                    required: "Campo obrigatório",
                  })}
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}
          />

          <Controller
            name="apelido"
            control={control}
            render={({ field }) => (
              <div>
                <label
                  htmlFor="apelido"
                  className="block text-sm font-medium text-white"
                >
                  Apelido
                </label>
                <input
                  {...field}
                  placeholder="Digite seu apelido"
                  {...formRegister("apelido", {
                    required: "Campo obrigatório",
                  })}
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}
          />
        </div>

        <Controller
          name="senha"
          control={control}
          render={({ field }) => (
            <div>
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-white"
              >
                Senha
              </label>
              <div className="relative mt-1">
                <input
                  {...field}
                  type={isVisibility ? "text" : "password"}
                  placeholder="Digite sua senha"
                  {...formRegister("senha", {
                    required: "Campo obrigatório",
                  })}
                  className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 focus:outline-none"
                >
                  {!isVisibility ? <EyeSlash size={24} /> : <Eye size={24} />}
                </button>
              </div>
            </div>
          )}
        />

        <Controller
          name="confirmarSenha"
          control={control}
          render={({ field }) => (
            <div>
              <label
                htmlFor="confirmarSenha"
                className="block text-sm font-medium text-white"
              >
                Confirmar Senha
              </label>
              <div className="relative mt-1">
                <input
                  {...field}
                  type={isConfirmPasswordVisibility ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  {...formRegister("confirmarSenha", {
                    required: "Campo obrigatório",
                  })}
                  className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 focus:outline-none"
                >
                  {!isConfirmPasswordVisibility ? (
                    <EyeSlash size={24} />
                  ) : (
                    <Eye size={24} />
                  )}
                </button>
              </div>
            </div>
          )}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-background font-bold rounded-lg hover:opacity-85 focus:outline-none"
          >
            Criar conta
          </button>
        </div>
      </form>

      <div className="text-center text-white pt-4 text-xs">
        <span>Já tem uma conta? </span>
        <Link to={"/login"} className="text-primary">
          Faça login
        </Link>
      </div>
    </div>
  );
}
