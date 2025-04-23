"use client";
import { Template } from "@/components";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <Template>
      <section className="flex-col items-center justify-center w-full flex items-center justify-center w-full min-h-[60vh]">
        <h1 className="text-gray-500 text-xl text-center">
          "404 - Página não encontrada"
        </h1>
        <span className="bg-indigo-800 hover:bg-indigo-950 mt-4 border-solid border-2 rounded-xl px-3 py-1">
          <a
            onClick={() => {
              router.push("/galery");
            }}
            className="text-white text-xl text-center"
            href="#"
          >
            Voltar
          </a>
        </span>
      </section>
    </Template>
  );
}
