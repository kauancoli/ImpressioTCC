import { api } from "@/api/axios";
import { PinList } from "@/components/Pins/PinList";
import { useSearch } from "@/context/SearchContextType";
import { GetPinsResponseDTO, PinDetailDTO } from "@/DTOS/PinDTO";
import { useEffect, useState } from "react";

export const Main: React.FC = () => {
  const { search } = useSearch();

  const [arts, setArts] = useState<PinDetailDTO[]>([]);
  const [artFiltered, setArtFiltered] = useState<PinDetailDTO[]>([]);

  const [loading, setLoading] = useState(false);

  async function getArts() {
    setLoading(true);
    try {
      const response = await api.get<GetPinsResponseDTO>("ObraArte");
      setArts(response.data.registros.filter((a) => a.publico));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const randomArts = arts.sort(() => Math.random() - 0.5);

  useEffect(() => {
    getArts();
  }, []);

  useEffect(() => {
    if (search) {
      const filteredArts = arts.filter((art) =>
        art.descricaoObraArte.toLowerCase().includes(search.toLowerCase())
      );
      setArtFiltered(filteredArts);
    }
  }, [search]);

  return (
    <div className="p-3">
      <PinList
        listOfPins={search ? artFiltered : randomArts}
        loading={loading}
      />
    </div>
  );
};
