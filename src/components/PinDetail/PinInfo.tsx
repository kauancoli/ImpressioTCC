import { useAuth } from "@/context/AuthContext";
import { PinDetailDTO } from "@/DTOS/PinDTO";
import { motion } from "framer-motion";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import json from "../../../mock.json";
import { PinList } from "../Pins/PinList";
import { UpDownVote } from "../UpDownVote";
import { UserTag } from "../UserTag";
import { PinImage } from "./PinImage";

type PinInfoProps = {};

export const PinInfo: React.FC<PinInfoProps> = () => {
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
      className="pt-6"
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
          className="flex justify-center items-center gap-8 flex-col lg:flex-row"
          key={`${p.id} - ${p.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <PinImage image={p.image.image} title={p.image.title} />
          <div className="flex flex-col gap-8 w-3/12">
            <h2 className="text-4xl font-bold text-white">{p.title}</h2>
            <div className="overflow-y-auto max-h-56 pr-8">
              <h2 className="text-white break-words">{p.desc}</h2>
            </div>
            <UserTag user={p.user} />
            <UpDownVote vote={p.vote} />
          </div>
        </motion.div>
      ))}

      <div className="mt-16 px-16">
        <h2 className="text-lg text-white text-center mb-8 select-none">
          Mais para Explorar
        </h2>
        <PinList listOfPins={randomPhotos} />
      </div>
    </motion.div>
  );
};
