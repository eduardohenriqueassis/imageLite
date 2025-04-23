import { Image } from "./image.resource";
import { useAuth } from "@/resources";

class ImageService {
  baseURL: string = "http://localhost:8080/v1/images";
  auth = useAuth();

  async getImages(
    query: string = "",
    extension: string = ""
  ): Promise<Image[]> {
    const userSession = this.auth.getUserSession();
    const url = `${this.baseURL}?query=${query}&extension=${extension}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
    });
    const parsedResponse = response.ok
      ? await response.json()
      : "Something wrong, please login again";
    return parsedResponse;
  }

  async postImage(data: FormData): Promise<string> {
    const userSession = this.auth.getUserSession();
    const response = await fetch(this.baseURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userSession?.accessToken}`,
      },
      body: data,
    });
    return response.headers.get("location") ?? "";
  }
}

export const useImageService = () => new ImageService();
