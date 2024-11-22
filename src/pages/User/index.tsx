import { api } from "@/api/axios";
import { PinList } from "@/components/Pins/PinList";
import { useAuth } from "@/context/AuthContext";
import { FavoriteDTO, GetFavoriteResponseDTO } from "@/DTOS/FavoriteDTO";
import { GetPinsResponseDTO, PinDetailDTO } from "@/DTOS/PinDTO";
import { GetUsersResponseDTO, UserDTO } from "@/DTOS/UserDTO";
import { motion } from "framer-motion";
import { User as UserIcon } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type UserProps = object;

type LoadingProps = {
  user: boolean;
  arts: boolean;
};

export const User: React.FC<UserProps> = () => {
  const { nickname } = useParams();
  const { user } = useAuth();

  const [loading, setLoading] = useState<LoadingProps>({
    user: false,
    arts: false,
  });
  const [userSelected, setUserSelected] = useState<UserDTO[]>([]);
  const [arts, setArts] = useState<PinDetailDTO[]>([]);
  const [favorites, setFavorites] = useState<FavoriteDTO[]>([]);
  const [activeTab, setActiveTab] = useState<"created" | "favorites">(
    "created"
  );

  async function getUser() {
    setLoading({
      user: true,
      arts: true,
    });
    try {
      const response = await api.get<GetUsersResponseDTO>("Usuario", {
        params: { apelido: nickname },
      });
      setUserSelected(response.data.registros);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading({
        user: false,
        arts: false,
      });
    }
  }
  async function getArtsByUser() {
    try {
      const response = await api.get<GetPinsResponseDTO>("ObraArte", {
        params: { idUsuario: userSelected[0].idUsuario },
      });
      setArts(response.data.registros.filter((art) => art.publico));
    } catch (error) {
      console.error(error);
    }
  }

  async function getFavorites() {
    try {
      const response = await api.get<GetFavoriteResponseDTO>(
        `ObraArteFavorita`,
        {
          params: { idUsuario: user?.idUsuario },
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
    if (userSelected.length > 0) {
      getArtsByUser();
      getFavorites();
    }
  }, [userSelected]);

  return (
    <motion.div
      className="pt-6 px-4 sm:px-8 bg-background text-white flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={pageAnimation}
    >
      {loading.user ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="w-2/3 h-96 bg-gray-800 animate-pulse rounded-3xl"></div>
        </div>
      ) : userSelected.length === 0 ? (
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
        userSelected.map((u) => (
          <>
            <div
              key={"Selected" + u?.idUsuario}
              className="flex flex-col items-center gap-3 p-6 rounded-xl shadow-md w-full sm:w-2/3 lg:w-1/2"
            >
              {u.imagemUsuario ? (
                <img
                  src={u.imagemUsuario}
                  alt="userImage"
                  className="rounded-full w-24 h-24 object-cover shadow-lg"
                />
              ) : (
                <div className="rounded-full w-12 h-12 md:w-24 md:h-24 bg-gray-400 flex justify-center items-center">
                  <UserIcon size={48} color="white" weight="bold" />
                </div>
              )}

              <h2 className="text-3xl font-semibold">{u?.nomeUsuario}</h2>
              <h3 className="text-sm text-gray-100">{u?.biografiaUsuario}</h3>
              <p className="text-md text-gray-400">{u?.apelido}</p>
            </div>

            <div className="w-full mt-8 sm:w-2/3 lg:w-4/5">
              <div className="flex justify-center gap-8 mb-4">
                <button
                  className={`py-2 px-4 text-lg font-semibold ${
                    activeTab === "created" ? "border-b-2 border-primary" : ""
                  }`}
                  onClick={() => setActiveTab("created")}
                >
                  Obras Criadas - {arts.length}
                </button>
                <button
                  className={`py-2 px-4 text-lg font-semibold ${
                    activeTab === "favorites" ? "border-b-2 border-primary" : ""
                  }`}
                  onClick={() => setActiveTab("favorites")}
                >
                  Obras Favoritadas - {favorites.length}
                </button>
              </div>

              {activeTab === "created" ? (
                <div>
                  {arts.length > 0 ? (
                    <div className="mt-4 px-2 sm:px-8 lg:px-16">
                      <PinList
                        listOfPins={arts}
                        loading={loading.arts}
                        showUser={false}
                        key={"Created" + u?.idUsuario}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-center">Nenhuma obra criada ainda.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {favorites.length > 0 ? (
                    <div className="flex items-center mt-4 px-2 sm:px-8 lg:px-16 gap-4">
                      {favorites.map((f, index) => (
                        <div key={"Fav" + f.idUsuario} className="group">
                          <Link to={`/pin/${f.idObraArte}`}>
                            <div className="relative overflow-hidden rounded-3xl shadow-lg cursor-pointer">
                              <img
                                src={f.imagemObraArte}
                                alt={`Obra ${index + 1}`}
                                className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white font-bold">
                                  {f.nomeUsuario}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center">
                      Você não tem nenhuma obra favoritada.
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        ))
      )}
    </motion.div>
  );
};
