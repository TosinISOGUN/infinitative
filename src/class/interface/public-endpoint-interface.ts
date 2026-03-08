import { AxiosInstance } from "axios";

export interface PublicEndpointInterface {
  axios: AxiosInstance;
  login(data: unknown): Promise<unknown>;
  register(data: unknown): Promise<unknown>;
  getProducts(): Promise<unknown>;
  getProductById(id: string): Promise<unknown>;
}