import { api } from "@/api/axios";
import { FavoriteDTO, GetFavoriteResponseDTO } from "@/DTOS/FavoriteDTO";
import { GetUsersResponseDTO, UserDTO } from "@/DTOS/UserDTO";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type UserProps = object;

export const User: React.FC<UserProps> = () => {
  const { nickname } = useParams();

  const [user, setUser] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteDTO[]>([]);

  async function getUser() {
    setLoading(true);
    try {
      const response = await api.get<GetUsersResponseDTO>("Usuario", {
        params: { apelido: nickname },
      });
      setUser(response.data.registros);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getFavorites() {
    try {
      const response = await api.get<GetFavoriteResponseDTO>(
        `ObraArteFavorita`,
        {
          params: { idUsuario: 2 },
        }
      );
      setFavorites(response.data.registros);
    } catch (error) {
      console.error(error);
    }
  }

  const pageAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user.length > 0) {
      getFavorites();
    }
  }, [user]);

  return (
    <motion.div
      className="pt-6 px-4 sm:px-8 bg-background text-white flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={pageAnimation}
    >
      {loading ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="w-2/3 h-96 bg-gray-800 animate-pulse rounded-3xl"></div>
        </div>
      ) : user.length === 0 ? (
        <>
          <h1 className="text-2xl sm:text-3xl font-bold text-center mt-8">
            Usuário não encontrado 🙁
          </h1>
          <Link to={"/"}>
            <p className="text-primary text-xl font-bold text-center mt-8">
              Clique aqui para voltar
            </p>
          </Link>
        </>
      ) : (
        user.map((u) => (
          <div
            key={u?.idUsuario}
            className="flex flex-col items-center gap-3 p-6 rounded-xl shadow-md w-full sm:w-2/3 lg:w-1/2"
          >
            <img
              src={u?.imagemUsuario || "/default-profile.png"}
              alt="User Avatar"
              className="rounded-full w-24 h-24 object-cover shadow-lg"
            />
            <h2 className="text-3xl font-semibold">{u?.nomeUsuario}</h2>
            <h3 className="text-sm text-gray-100">
              {u?.biografiaUsuario}blasdaçsldksaçdk alkdjsklaj dlkasj
              dlkajdlkasj
            </h3>
            <p className="text-md text-gray-400">{u?.apelido}</p>
            <div className="flex mt-4 select-none">
              <Link
                to={`/user/edit/${u?.idUsuario}`}
                className="bg-primary text-black px-5 py-2 rounded-full shadow-md hover:bg-primary-light transition font-bold"
              >
                Editar Perfil
              </Link>
            </div>
          </div>
        ))
      )}

      {!loading && favorites.length > 0 && (
        <div className="w-full mt-8 sm:w-2/3 lg:w-4/5">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
            Obras Favoritadas
          </h2>
          <div className="flex items-center justify-center gap-4">
            {favorites.map((f, index) => (
              <Link to="/favoritos" key={index} className="group">
                <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
                  <img
                    src={f.imagemObraArte}
                    alt={`Obra ${index + 1}`}
                    className="w-full h-48 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 p-2">
                    <p className="text-black font-bold">{favorites.length}</p>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold">Ver Favoritos</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
