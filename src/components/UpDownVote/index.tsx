import { UpDownVoteDTO } from "@/DTOS/PinDTO";
import { ArrowFatDown, ArrowFatUp } from "phosphor-react";
import { useState } from "react";

type UpDownVoteProps = {
  vote: UpDownVoteDTO;
};

export const UpDownVote = ({ vote }: UpDownVoteProps) => {
  const [upVote, setUpVote] = useState<number>(vote.up);
  const [downVote, setDownVote] = useState<number>(vote.down);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleUpVote = () => {
    if (userVote === "up") {
      setUpVote(upVote - 1);
      setUserVote(null);
    } else if (userVote === "down") {
      setUpVote(upVote + 1);
      setDownVote(downVote - 1);
      setUserVote("up");
    } else {
      setUpVote(upVote + 1);
      setUserVote("up");
    }
  };

  const handleDownVote = () => {
    if (userVote === "down") {
      setDownVote(downVote - 1);
      setUserVote(null);
    } else if (userVote === "up") {
      setDownVote(downVote + 1);
      setUpVote(upVote - 1);
      setUserVote("down");
    } else {
      setDownVote(downVote + 1);
      setUserVote("down");
    }
  };

  return (
    <div className="flex items-center gap-2 border border-primary w-fit px-3 py-2 rounded-2xl select-none">
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
  );
};
