import { api } from "@/api/axios";
import { PinList } from "@/components/Pins/PinList";
import { GetPinsResponseDTO, PinDetailDTO } from "@/DTOS/PinDTO";
import { useEffect, useState } from "react";

export const Main: React.FC = () => {
  const [arts, setArts] = useState<PinDetailDTO[]>([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getArts();
  }, []);

  return (
    <div className="p-3">
      <PinList listOfPins={arts} loading={loading} />
    </div>
  );
};
