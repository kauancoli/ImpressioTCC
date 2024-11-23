import { api } from "@/api/axios";
import { UpDownVote } from "@/components/UpDownVote";
import { useAuth } from "@/context/AuthContext";
import { FavoriteDTO, GetFavoriteResponseDTO } from "@/DTOS/FavoriteDTO";
import { GetPinsResponseDTO, PinDetailDTO } from "@/DTOS/PinDTO";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PinImage } from "../../components/PinDetail/PinImage";
import { PinList } from "../../components/Pins/PinList";
import { UserTag } from "../../components/UserTag";

type PinInfoProps = object;

const URL = import.meta.env.VITE_API;

type LoadingProps = {
  user: boolean;
  arts: boolean;
  favorites: boolean;
};

export const Pin: React.FC<PinInfoProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const [arts, setArts] = useState<PinDetailDTO[]>([]);
  const [favorite, setFavorite] = useState<FavoriteDTO | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<LoadingProps>({
    user: false,
    arts: false,
    favorites: false,
  });
  const [currentId, setCurrentId] = useState(id);

  async function getArts() {
    setLoading({
      arts: true,
      user: false,
      favorites: true,
    });
    try {
      const response = await api.get<GetPinsResponseDTO>("ObraArte");
      setArts(
        response.data.registros
          .filter((a) => a.publico)
          .sort(() => Math.random() - 0.5)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading({
        arts: false,
        user: false,
        favorites: false,
      });
    }
  }

  async function getFavoriteByUserId() {
    try {
      const response = await api.get<GetFavoriteResponseDTO>(
        "ObraArteFavorita/GetByUsuarioEObra",
        {
          params: {
            idUsuario: user?.idUsuario ?? 0,
            idObraArte: id,
          },
        }
      );
      setFavorite(response.data.registros[0] || null);

      if (response.data.registros[0]) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFavorite() {
    setLoading({
      arts: false,
      user: false,
      favorites: true,
    });
    try {
      if (!user?.idUsuario) {
        console.error("Usuário não está logado.");
        return;
      }

      if (!isFavorite) {
        await api.post(`ObraArteFavorita`, {
          idUsuario: user.idUsuario,
          idObraArte: parseInt(id as string),
          idObraArteFavoritada: 0,
        });
        setIsFavorite(true);
      } else {
        await axios.delete(`${URL}/ObraArteFavorita`, {
          data: { idObraFavorita: favorite?.idObraFavoritada },
        });
        setIsFavorite(false);
      }
      setLoading({
        arts: false,
        user: false,
        favorites: false,
      });
    } catch (error) {
      setLoading({
        arts: false,
        user: false,
        favorites: false,
      });
      console.error(error);
    }
  }

  const filteredPhotos = arts.filter(
    (photo) => photo.idObraArte.toString() === id && photo.publico === true
  );
  const remainingPhotos = arts.filter(
    (photo) => photo.idObraArte.toString() !== id && photo.publico === true
  );
  const randomPhotos = remainingPhotos.sort(() => Math.random() - 0.5);

  useEffect(() => {
    getArts();
    getFavoriteByUserId();
  }, [id]);

  useEffect(() => {
    if (isFavorite) {
      getFavoriteByUserId();
    }
  }, [isFavorite, id]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "instant" });
    setCurrentId(id);
  }, [id]);

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

  return (
    <motion.div
      className="pt-6 px-4 sm:px-8"
      ref={topRef}
      initial="hidden"
      animate="visible"
      variants={pageAnimation}
      key={currentId}
    >
      {loading.arts ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="w-2/3 h-96 bg-gray-800 animate-pulse rounded-3xl"></div>
        </div>
      ) : filteredPhotos.length === 0 ? (
        <>
          <h1 className="text-white text-2xl sm:text-3xl font-bold text-center mt-8">
            Obra de arte não encontrada 🙁
          </h1>
          <Link to={"/"}>
            <p className="text-primary text-xl sm:text-xl font-bold text-center mt-8">
              Clique aqui para voltar
            </p>
          </Link>
        </>
      ) : (
        filteredPhotos.map((p) => (
          <div key={`${p.idObraArte} - ${p.descricaoObraArte}`}>
            <div className="absolute">
              <ArrowLeft
                size={32}
                className="cursor-pointer"
                color="white"
                onClick={() => navigate("/")}
              />
            </div>
            <motion.div
              className="flex flex-col lg:flex-row justify-center items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <PinImage image={p.imagemObraArte} title={p.descricaoObraArte} />
              <div className="flex flex-col gap-4 w-full lg:w-4/12 items-center lg:items-start">
                <div className="overflow-y-auto max-h-56 pr-2 lg:pr-8 text-sm sm:text-base">
                  <h2 className="text-white break-words font-bold">
                    {p.descricaoObraArte}
                  </h2>
                </div>
                <UserTag userTag={p} />
                <div className="flex items-center gap-4">
                  <UpDownVote
                    vote={{ idUsuario: user?.idUsuario!, idObraArte: 1 }}
                    onVote={async () => {}}
                    onFavorite={handleFavorite}
                    isFavorite={isFavorite}
                    favoriteLoading={loading.favorites}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        ))
      )}

      <div className="mt-10 lg:mt-16 px-2 sm:px-8 lg:px-16">
        <h2 className="text-base sm:text-lg text-white text-center mb-4 lg:mb-8 select-none font-semibold">
          Mais para Explorar
        </h2>
        <PinList listOfPins={randomPhotos} loading={loading.arts} />
      </div>
    </motion.div>
  );
};
