import { PinDetailDTO } from "@/DTOS/PinDTO";
import { motion } from "framer-motion";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import json from "../../../mock.json";
import { PinImage } from "../../components/PinDetail/PinImage";
import { PinList } from "../../components/Pins/PinList";
import { UpDownVote } from "../../components/UpDownVote";
import { UserTag } from "../../components/UserTag";

type PinInfoProps = object;

export const Pin: React.FC<PinInfoProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);

  const photos: PinDetailDTO[] = json;
  const filteredPhotos = photos.filter((photo) => photo.id.toString() === id);
  const remainingPhotos = photos.filter((photo) => photo.id.toString() !== id);
  const randomPhotos = remainingPhotos.sort(() => Math.random() - 0.5);

  const [currentId, setCurrentId] = useState(id);

  if (!filteredPhotos.length) {
    navigate("/");
  }

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
      <div className="absolute">
        <ArrowLeft
          size={32}
          className="cursor-pointer"
          color="white"
          onClick={() => navigate("/")}
        />
      </div>

      {filteredPhotos.map((p) => (
        <motion.div
          className="flex flex-col lg:flex-row justify-center items-center gap-8"
          key={`${p.id} - ${p.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <PinImage image={p.image.image} title={p.image.title} />
          <div className="flex flex-col gap-4 w-full lg:w-4/12 items-center lg:items-start">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center lg:text-left">
              {p.title}
            </h2>
            <div className="overflow-y-auto max-h-56 pr-2 lg:pr-8 text-sm sm:text-base">
              <h2 className="text-white break-words">{p.desc}</h2>
            </div>
            <UserTag user={p.user} />
            <UpDownVote vote={p.vote} />
          </div>
        </motion.div>
      ))}

      <div className="mt-10 lg:mt-16 px-2 sm:px-8 lg:px-16">
        <h2 className="text-base sm:text-lg text-white text-center mb-4 lg:mb-8 select-none">
          Mais para Explorar
        </h2>
        <PinList listOfPins={randomPhotos} />
      </div>
    </motion.div>
  );
};
