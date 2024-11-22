import { GetLoginResponseDTO } from "@/DTOS/LoginDTO";
import { UserDTO } from "@/DTOS/UserDTO";
import { getCookie, setCookie } from "@/utils/cookie";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const URL = import.meta.env.VITE_API;

interface AuthContextData {
  token: string | null;
  login: (username: string, password: string) => void;
  register: (
    username: string,
    email: string,
    birthdate: string,
    password: string
  ) => void;
  signOut: () => void;
  user: UserDTO | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = getCookie("token");

    if (token) {
      setToken(token);
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const response = await signInApi(email, password);
      if (response) {
        setToken(response.token);
        setCookie("token", response.token);

        await new Promise((resolve) => setTimeout(resolve, 50));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function register(
    username: string,
    email: string,
    birthdate: string,
    password: string
  ) {
    setLoading(true);
    try {
      const response = await signUpApi(username, email, birthdate, password);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  function signOut() {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, login, register, signOut, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

async function signInApi(
  emailUsuario: string,
  senha: string
): Promise<GetLoginResponseDTO | null> {
  try {
    const response = await axios.post(`${URL}/Login`, {
      emailUsuario,
      senha,
    });

    console.log("RD", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during login", error);
    return null;
  }
}

async function signUpApi(
  username: string,
  email: string,
  birthdate: string,
  password: string
): Promise<string | null> {
  try {
    const response = await axios.post("", {
      username,
      email,
      birthdate,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
