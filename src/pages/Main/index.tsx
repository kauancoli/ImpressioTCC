import { PinList } from "@/components/Pins/PinList";
import { PinDetailDTO } from "@/DTOS/PinDTO";
import React from "react";
import json from "../../../mock.json";

export const Main: React.FC = () => {
  const photos: PinDetailDTO[] = json;

  return (
    <div className="p-5">
      <PinList listOfPins={photos} />
    </div>
  );
};
