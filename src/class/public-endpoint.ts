import $api from "@/utils/api";
import { PublicEndpointInterface } from "./interface/public-endpoint-interface";

export class PublicEndpoint implements PublicEndpointInterface {
  axios = $api;

  async login(data: unknown): Promise<unknown> {
    const response = await this.axios.post("/auth/login", data);
    return response.data;
  }

  async register(data: unknown): Promise<unknown> {
    const response = await this.axios.post("/auth/register", data);
    return response.data;
  }

  async getProducts(): Promise<unknown> {
    const response = await this.axios.get("/products");
    return response.data;
  }

  async getProductById(id: string): Promise<unknown> {
    const response = await this.axios.get(`/products/${id}`);
    return response.data;
  }
}
