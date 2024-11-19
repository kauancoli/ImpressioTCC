import { ArrowUp } from "phosphor-react";
import { useState } from "react";

interface UploadImageProps {
  setBase64: (base64: string) => void;
}

export const UploadImage = ({ setBase64 }: UploadImageProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setBase64(reader.result.toString());
        setPreview(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-[450px] bg-background rounded-lg">
      <label
        className="m-5 flex flex-col justify-center items-center
        cursor-pointer h-[90%] 
        border-[2px] border-gray-300 border-dashed rounded-lg text-white"
      >
        {!preview ? (
          <div className="flex items-center flex-col">
            <ArrowUp className="text-[22px]" />
            <h2 className="font-semibold">Clique para fazer Upload</h2>
          </div>
        ) : (
          <img src={preview} alt="preview" className="object-contain h-[90%]" />
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileChange(e.target.files[0]);
            }
          }}
        />
      </label>
    </div>
  );
};
