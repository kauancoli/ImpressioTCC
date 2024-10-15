import React from "react";
import json from "../../../mock.json";
interface Image {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

export const Main: React.FC = () => {
  const photos: Image[] = json;

  return (
    <div className="container mx-auto p-8 h-screen">
      <div className="overflow-y-auto h-5/6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {photos.map((photo) => (
            <div key={photo.id} className="relative">
              <img
                src={photo.urls.regular}
                alt={photo.alt_description}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
