"use client";

import {
  Template,
  ImageCard,
  Button,
  InputText,
  AuthenticatedPage,
} from "@/components";
import { useAuth, useImageService } from "@/resources";
import { Image } from "@/resources/image/image.resource";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useNotification } from "@/components/notification";
import { useRouter } from "next/navigation";
import { string } from "yup";

export default function GaleryPage() {
  const notification = useNotification();
  const useService = useImageService();
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [extension, setExtension] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const auth = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  async function searchImages(deletedImage) {
    setLoading(true);
    if (!auth.isSessionValid()) {
      router.push("/login");
      return;
    }
    const result = await useService.getImages(query, extension);
    if (
      typeof result === "string" &&
      result === "Something wrong, please login again"
    ) {
      notification.notify("Something wrong, please login again", "warning");
      localStorage.removeItem("token");
      setLoading(false);
      router.push("/login");
      return;
    }
    setImages(result);
    setLoading(false);
    if (result.length === 0) {
      notification.notify("No results found.", "warning");
    }
    if (typeof deletedImage === "string") {
      window.alert(deletedImage + "foi apagada com sucesso!");
    }
  }
  function renderImageCard(image: Image) {
    return (
      <ImageCard
        name={image.name}
        size={image.size}
        uploadedDate={image.uploadDate}
        src={image.url}
        extension={image.extension}
        key={image.id}
        email={image.userEmail}
        id={image.id}
        handleDeleteImage={handleDeleteImage}
      />
    );
  }
  function renderImageCards() {
    return images.map(renderImageCard);
  }

  async function handleDeleteImage(id: string) {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir esta imagem?"
    );
    if (!confirm) return;
    console.log(id);
    const response = await useService.deleteImages(id);
    console.log(response);
    searchImages(response);
  }

  return (
    <AuthenticatedPage>
      {isClient && (
        <Template loading={loading}>
          <section className="flex flex-col items-center justify-center my-5">
            <div className="flex space-x-4">
              <InputText
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Digite name or tags.."
                type="text"
                id="SearchTags"
              />
              <select
                className="border px-3 py-2 rounded-lg text-gray-900"
                onChange={(event) => setExtension(event.target.value)}
              >
                <option value="">All Formats</option>
                <option value="PNG">PNG</option>
                <option value="JPEG">JPEG</option>
                <option value="GIF">GIF</option>
                <option value="WEBP">WEBP</option>
              </select>
              <Button color="blue" text="Search" onClick={searchImages} />
              <Link href="/form">
                <Button color="yellow" text="Add New" />
              </Link>
            </div>
          </section>
          <section className="grid gap-4 grid-cols-2 sm:grid-cols-2  md:grid-cols-4 sm:gap-8">
            {renderImageCards()}
          </section>
        </Template>
      )}
    </AuthenticatedPage>
  );
}
