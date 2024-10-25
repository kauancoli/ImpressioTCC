import { PinImageDTO } from "@/DTOS/PinDTO";

export const PinImage = ({ image, title }: PinImageDTO) => {
  return (
    <div>
      <img
        src={image}
        alt={title}
        width={400}
        height={400}
        className="rounded-s-3xl"
      />
    </div>
  );
};
