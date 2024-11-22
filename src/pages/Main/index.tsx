import { api } from "@/api/axios";
import { PinList } from "@/components/Pins/PinList";
import { GetPinsResponseDTO, PinDetailDTO } from "@/DTOS/PinDTO";
import { useEffect, useState } from "react";

export const Main: React.FC = () => {
  const [arts, setArts] = useState<PinDetailDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  async function getArts() {
    setLoading(true);
    try {
      const response = await api.get<GetPinsResponseDTO>("ObraArte");
      setArts(response.data.registros.filter((art) => art.publico));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (search === "") {
      getArts();
    } else {
      const filteredArts = arts.filter((art) =>
        art.descricaoObraArte.toLowerCase().includes(search.toLowerCase())
      );
      setArts(filteredArts);
    }
  }, []);

  return (
    <div className="p-3">
      <PinList listOfPins={arts} loading={loading} />
    </div>
  );
};
