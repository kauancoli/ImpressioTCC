import { api } from "@/api/axios";
import {
  GetLoginResponseDTO,
  GetUserByIdResponseDTO,
  UserDTO,
} from "@/DTOS/UserDTO";
import { getCookie, setCookie } from "@/utils/cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const URL = import.meta.env.VITE_API;

interface UserJwtDTO {
  unique_name: string;
  nbf: number;
  exp: number;
  iat: number;
}

interface AuthContextData {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    birthdate: string,
    password: string
  ) => Promise<void>;
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
    async function validateToken() {
      const storedToken = getCookie("imp-token");
      const storedUser = getCookie("imp-user");
      if (storedToken) {
        try {
          const decodedToken = jwtDecode<UserJwtDTO>(storedToken);

          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            throw new Error("Token expired");
          }

          setToken(storedToken);

          setUser(storedUser ? JSON.parse(storedUser) : null);
        } catch (error) {
          console.error("Invalid token", error);
          signOut();
        }
      }
      setLoading(false);
    }

    validateToken();
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const response = await signInApi(email, password);
      if (response?.success) {
        setToken(response.token);
        setCookie("imp-token", response.token);

        const user = await getUser(response.dados.idUsuario);
        if (user) {
          setUser(user);
          setCookie("imp-user", JSON.stringify(user));
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
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
      await signUpApi(username, email, birthdate, password);
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    setToken(null);
    setUser(null);
    setCookie("imp-token", "", -1);
    setCookie("imp-user", "", -1);

    window.location.reload();
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
  email: string,
  password: string
): Promise<GetLoginResponseDTO | null> {
  try {
    const response = await axios.post(`${URL}/Login`, {
      emailUsuario: email,
      senha: password,
    });

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
    const response = await axios.post(`${URL}/Register`, {
      username,
      email,
      birthdate,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error during registration", error);
    return null;
  }
}

async function getUser(userId: number): Promise<UserDTO | null> {
  try {
    const response = await api.get<GetUserByIdResponseDTO>(`/Usuario/GetById`, {
      params: {
        idUsuario: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user", error);
    return null;
  }
}
