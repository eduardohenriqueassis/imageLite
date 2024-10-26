import { Image } from "./image.resource";

class ImageService {
  baseURL: string = "http://localhost:8080/v1/images";

  async getImages(
    query: string = "",
    extension: string = ""
  ): Promise<Image[]> {
    const url = `${this.baseURL}?query=${query}&extension=${extension}`;
    const response = await fetch(url);
    return await response.json();
  }

  async postImage(data: FormData): Promise<string> {
    const response = await fetch(this.baseURL, {
      method: "POST",
      body: data,
    });
    return response.headers.get("location") ?? "";
  }
}

export const useImageService = () => new ImageService();
