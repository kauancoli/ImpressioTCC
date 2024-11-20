import { VoteDTO } from "@/DTOS/VoteDTO";
import { ArrowFatDown, ArrowFatUp, Star } from "phosphor-react";
import { useState } from "react";

type UpDownVoteProps = {
  vote: Omit<VoteDTO, "voto">;
  onVote: (voteData: VoteDTO) => Promise<void>;
  onFavorite: () => void;
};

export const UpDownVote = ({ vote, onVote, onFavorite }: UpDownVoteProps) => {
  const [upVote, setUpVote] = useState<number>(0);
  const [downVote, setDownVote] = useState<number>(0);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [favorite, setFavorite] = useState<boolean>(false);

  const sendVote = async (voto: number) => {
    const voteData: VoteDTO = {
      idUsuario: vote.idUsuario,
      idObraArte: vote.idObraArte,
      voto,
    };
    try {
      await onVote(voteData);
    } catch (error) {
      console.error("Erro ao enviar o voto:", error);
    }
  };

  const handleUpVote = () => {
    if (userVote === "up") {
      setUpVote(upVote - 1);
      setUserVote(null);
      sendVote(0);
    } else if (userVote === "down") {
      setUpVote(upVote + 1);
      setDownVote(downVote - 1);
      setUserVote("up");
      sendVote(1);
    } else {
      setUpVote(upVote + 1);
      setUserVote("up");
      sendVote(1);
    }
  };

  const handleDownVote = () => {
    if (userVote === "down") {
      setDownVote(downVote - 1);
      setUserVote(null);
      sendVote(0);
    } else if (userVote === "up") {
      setDownVote(downVote + 1);
      setUpVote(upVote - 1);
      setUserVote("down");
      sendVote(2);
    } else {
      setDownVote(downVote + 1);
      setUserVote("down");
      sendVote(2);
    }
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    onFavorite();
  };

  return (
    <div className="flex items-centerw-fit gap-8 px-4 py-2 rounded-2xl select-none">
      <div className="flex items-center gap-2">
        <ArrowFatUp
          size={20}
          className="cursor-pointer"
          color="#FED215"
          onClick={handleUpVote}
          weight={userVote === "up" ? "fill" : "regular"}
        />
        <div>
          <span className="text-white">{upVote}</span>
        </div>

        <ArrowFatDown
          size={20}
          className="cursor-pointer"
          color="#FED215"
          onClick={handleDownVote}
          weight={userVote === "down" ? "fill" : "regular"}
        />
        <div>
          <span className="text-white">{downVote}</span>
        </div>
      </div>

      <Star
        size={32}
        className="cursor-pointer"
        color="#FED215"
        onClick={handleFavorite}
        weight={favorite ? "fill" : "regular"}
      />
    </div>
  );
};
