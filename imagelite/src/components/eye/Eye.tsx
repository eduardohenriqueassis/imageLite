import EyeSVG from "@/../public/eye.svg";
import EyseSlashSVG from "@/../public/eye-slash.svg";
import { useEffect, useState } from "react";

interface EyeProps {
  isPlural?: boolean;
  openEye: boolean;
  countToCloseTheEye?: number | any;
  onClick?: (event: any) => void;
}

export const Eye: React.FC<EyeProps> = ({
  isPlural,
  openEye,
  onClick,
  countToCloseTheEye,
}: EyeProps) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const messages = {
    show: {
      singular: "Mostrar Senha",
      plural: "Mostrar Senhas",
    },
    hide: { singular: "Esconder Senha", plural: "Esconder Senhas" },
  };

  useEffect(() => {
    if (openEye) {
      setTimeLeft(countToCloseTheEye); // Inicia a contagem regressiva

      const counter = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev !== null && prev > 0) {
            return prev - 1;
          } else {
            clearInterval(counter);
            return null; // Para esconder a contagem após 0
          }
        });
      }, 1000);

      return () => clearInterval(counter); // Limpa o intervalo ao desmontar
    } else {
      setTimeLeft(null); // Reseta o contador quando openEye for falso
    }
  }, [openEye]);

  return (
    <div className="flex itens-center">
      <p
        className={`${
          !openEye ? "text-gray-600" : "text-red-600"
        } text-xs mr-2`}
      >
        {openEye && timeLeft !== null && (
          <span id="counter">{timeLeft} - </span>
        )}
        {isPlural
          ? openEye
            ? messages.hide.plural
            : messages.show.plural
          : openEye
          ? messages.hide.singular
          : messages.show.singular}
      </p>
      <button onClick={onClick} className="cursor-pointer" type="button">
        {openEye ? (
          <EyeSVG className="w-4 h-4 text-red-600" />
        ) : (
          <EyseSlashSVG className="w-4 h-4 text-gray-500" />
        )}
      </button>
    </div>
  );
};
