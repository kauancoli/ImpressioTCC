import { useAuth } from "@/context/AuthContext";
import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function RegisterForm() {
  const { register } = useAuth();
  const [name, setName] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isVisibility, setIsVisibility] = useState<boolean>(false);
  const [isVisibilityConfirm, setIsVisibilityConfirm] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const age = calculateAge(new Date(birthdate));
    if (age < 16) {
      alert("Você precisa ter pelo menos 16 anos para criar uma conta.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await register(name, email, birthdate, password);
      navigate("/");
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  const handlePasswordVisibility = () => {
    setIsVisibility(!isVisibility);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsVisibilityConfirm(!isVisibilityConfirm);
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-lg shadow-2xl border border-primary">
      <h2 className="text-xl font-bold text-center mb-3 text-white">
        Cadastre-se no{" "}
        <span className="text-primary">
          Impress<span className="text-white">.</span>io
        </span>
      </h2>

      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white"
          >
            Nome de Usuário
          </label>
          <input
            type="text"
            id="name"
            placeholder="Digite seu nome de usuário"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

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
            htmlFor="birthdate"
            className="block text-sm font-medium text-white"
          >
            Data de Nascimento
          </label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
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
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-white"
          >
            Confirmar Senha
          </label>
          <div className="relative mt-1">
            <input
              type={isVisibilityConfirm ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={handleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 focus:outline-none"
            >
              {!isVisibilityConfirm ? (
                <EyeSlash size={24} />
              ) : (
                <Eye size={24} />
              )}
            </button>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-background font-bold rounded-lg hover:opacity-85 focus:outline-none"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
