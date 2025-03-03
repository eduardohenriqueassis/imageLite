import EyeSVG from "@/../public/eye.svg";
import EyseSlashSVG from "@/../public/eye-slash.svg";

interface EyeProps {
  isPlural?: boolean;
  openEye: boolean;
  onClick?: (event: any) => void;
}

export const Eye: React.FC<EyeProps> = ({
  isPlural,
  openEye,
  onClick,
}: EyeProps) => {
  const messages = {
    singular: "Show Password",
    plural: "Show Passwords",
  };
  return (
    <div className="flex itens-center">
      <p className="text-gray-600 text-xs mr-2">
        {isPlural ? messages.plural : messages.singular}
      </p>
      <button onClick={onClick} className="cursor-pointer">
        {!openEye ? (
          <EyeSVG className="w-4 h-4 text-gray-500" />
        ) : (
          <EyseSlashSVG className="w-4 h-4 text-gray-500" />
        )}
      </button>
    </div>
  );
};
