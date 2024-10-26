"use client";
import { Tooltip } from "@nextui-org/tooltip";
import { Utils } from "./../utils/utils";

interface ImageCardProps {
  name?: string;
  size?: number;
  uploadedDate?: string;
  src?: string;
  extension?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  name,
  size,
  uploadedDate,
  src,
  extension,
}: ImageCardProps) => {
  function downloadImage() {
    window.open(src, "_blank");
  }

  return (
    <div className="card relative bg-white rounded-md shadow-md transition-transform easy-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
      <Tooltip
        showArrow={true}
        className="capitalize bg-blue-500 font-light text-white rounded-lg text-xs mt-0.5 shadow-md -translate-y-6"
        content="Clique na imagem para baixar"
        placement="bottom-end"
        closeDelay={0}
      >
        <img
          src={src}
          className="h-56 w-full object-cover rounded-t-md"
          alt={name}
          onClick={downloadImage}
        />
      </Tooltip>
      <div className="card-body p-4">
        <h5 className="text-x1 font-semibold  mb-2 text-gray-600">
          {`${name}.${extension?.toLowerCase()}`}
        </h5>
        <p className="text-gray-600">{Utils.formatBytes(Number(size))}</p>
        <p className="text-gray-600">{uploadedDate}</p>
      </div>
    </div>
  );
};
