import { useAuth } from "@/context/AuthContext";
import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const { login } = useAuth();

  const [isVisibility, setIsVisibility] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (loginData: LoginFormData) => {
    try {
      await login(loginData.email, loginData.password);

      setError(null);
      navigate("/");
    } catch (error: any) {
      setError(error.response?.data?.message || "Erro ao fazer login");
      console.error(error);
    }
  };

  const handlePasswordVisibility = () => {
    setIsVisibility(!isVisibility);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-lg shadow-2xl border border-primary">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Bem vindo(a) ao{" "}
        <span className="text-primary">
          Impress<span className="text-white">.</span>io
        </span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                {...field}
                type="email"
                placeholder="Digite seu email"
                {...register("email", {
                  required: "Campo obrigatório",
                })}
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Senha
              </label>
              <div className="relative mt-1">
                <input
                  {...field}
                  type={isVisibility ? "text" : "password"}
                  id="password"
                  placeholder="Digite sua senha"
                  {...register("password", {
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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-background font-bold rounded-lg hover:opacity-85 focus:outline-none"
          >
            Iniciar sessão
          </button>
        </div>
      </form>

      <div className="text-center text-white pt-4 text-xs">
        <span>Não tem uma conta? </span>
        <a href="/register" className="text-primary">
          Criar conta
        </a>
      </div>
    </div>
  );
}
