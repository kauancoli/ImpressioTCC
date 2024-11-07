import { useAuth } from "@/context/AuthContext";
import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisibility, setIsVisibility] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      login(email, password);
      navigate("/");
    } catch (error: any) {
      console.error(error.response.data.message);
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

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            Senha
          </label>
          <div className="relative mt-1">
            <input
              type={isVisibility ? "text" : "password"}
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
