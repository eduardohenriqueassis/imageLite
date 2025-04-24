"use client";
import { Tooltip } from "@nextui-org/tooltip";
import { Utils } from "@/utils/utils";
import { useAuth, useImageService } from "@/resources";

interface ImageCardProps {
  name?: string;
  size?: number;
  uploadedDate?: string;
  src?: string;
  extension?: string;
  email?: string;
  id?: string;
  handleDeleteImage?: (id: string) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  name,
  size,
  uploadedDate,
  src,
  extension,
  email,
  id,
  handleDeleteImage,
}: ImageCardProps) => {
  function downloadImage() {
    window.open(src, "_blank");
  }
  const useService = useImageService();
  const styles = {
    btn: "bg-indigo-800 hover:bg-indigo-900 px-4 py-1 rounded-md w-100 w-full text-xs",
    "btn-disabled":
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-100",
    p: "text-gray-600 text-sm md:text-xl",
  };
  const user = useAuth();
  const userEmail = user.getUserSession()?.email;

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
        <h5 className="text-base sm:text-xl font-semibold mb-2 text-gray-600">
          {`${name}.${extension?.toLowerCase()}`}
        </h5>
        <p className={`${styles.p}`}>{Utils.formatBytes(Number(size))}</p>
        <p className={`${styles.p}`}>{uploadedDate}</p>
        <div>
          {email === userEmail ? (
            <button
              onClick={() => handleDeleteImage?.(id ?? "")}
              className={`${styles.btn} `}
            >
              Apagar Foto
            </button>
          ) : (
            <button
              disabled
              className={`${styles.btn} ${styles["btn-disabled"]}`}
            >
              Apagar Foto
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
