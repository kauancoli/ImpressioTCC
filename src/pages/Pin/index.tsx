import { api } from "@/api/axios";
import { UpDownVote } from "@/components/UpDownVote";
import { GetFavoriteResponseDTO } from "@/DTOS/FavoriteDTO";
import { GetPinsResponseDTO, PinDetailDTO } from "@/DTOS/PinDTO";
import { motion } from "framer-motion";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PinImage } from "../../components/PinDetail/PinImage";
import { PinList } from "../../components/Pins/PinList";
import { UserTag } from "../../components/UserTag";

type PinInfoProps = object;

export const Pin: React.FC<PinInfoProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);

  const [arts, setArts] = useState<PinDetailDTO[]>([]);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(id);

  async function getArts() {
    setLoading(true);
    try {
      const response = await api.get<GetPinsResponseDTO>("ObraArte");
      setArts(response.data.registros);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getFavoriteByUser() {
    try {
      const response = await api.get<GetFavoriteResponseDTO>(
        "ObraArteFavorita",
        {
          params: { idUsuario: 2 },
        }
      );
      setFavorite(response.data.registros.length > 0);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFavorite() {
    try {
      await api.post(`ObraArteFavorita`, {
        idUsuario: 2,
        idObraArte: parseInt(id as string),
        idObraArteFavoritada: 0,
      });
      setFavorite(!favorite);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredPhotos = arts.filter(
    (photo) => photo.idObraArte.toString() === id
  );
  const remainingPhotos = arts.filter(
    (photo) => photo.idObraArte.toString() !== id
  );
  const randomPhotos = remainingPhotos.sort(() => Math.random() - 0.5);

  useEffect(() => {
    getArts();
  }, []);

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
      {loading ? (
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
          <>
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
              key={`${p.idObraArte} - ${p.descricaoObraArte}`}
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
                <UserTag user={p} />
                <div className="flex items-center gap-4">
                  <UpDownVote
                    vote={{ idUsuario: 2, idObraArte: 1 }}
                    onVote={async () => {}}
                    onFavorite={handleFavorite}
                  />
                </div>
              </div>
            </motion.div>
          </>
        ))
      )}

      <div className="mt-10 lg:mt-16 px-2 sm:px-8 lg:px-16">
        <h2 className="text-base sm:text-lg text-white text-center mb-4 lg:mb-8 select-none font-semibold">
          Mais para Explorar
        </h2>
        <PinList listOfPins={randomPhotos} loading={loading} />
      </div>
    </motion.div>
  );
};
